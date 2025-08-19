package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.ConAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.Con;
import com.actionnow.knetwork.repository.ConRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link ConResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cons";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ConRepository conRepository;

    @Autowired
    private MockMvc restConMockMvc;

    private Con con;

    private Con insertedCon;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Con createEntity() {
        return new Con().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Con createUpdatedEntity() {
        return new Con().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        con = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCon != null) {
            conRepository.delete(insertedCon);
            insertedCon = null;
        }
    }

    @Test
    void createCon() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Con
        var returnedCon = om.readValue(
            restConMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(con)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Con.class
        );

        // Validate the Con in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertConUpdatableFieldsEquals(returnedCon, getPersistedCon(returnedCon));

        insertedCon = returnedCon;
    }

    @Test
    void createConWithExistingId() throws Exception {
        // Create the Con with an existing ID
        con.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(con)))
            .andExpect(status().isBadRequest());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        con.setValue(null);

        // Create the Con, which fails.

        restConMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(con)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCons() throws Exception {
        // Initialize the database
        insertedCon = conRepository.save(con);

        // Get all the conList
        restConMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(con.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getCon() throws Exception {
        // Initialize the database
        insertedCon = conRepository.save(con);

        // Get the con
        restConMockMvc
            .perform(get(ENTITY_API_URL_ID, con.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(con.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingCon() throws Exception {
        // Get the con
        restConMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCon() throws Exception {
        // Initialize the database
        insertedCon = conRepository.save(con);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the con
        Con updatedCon = conRepository.findById(con.getId()).orElseThrow();
        updatedCon.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restConMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCon.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(updatedCon))
            )
            .andExpect(status().isOk());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedConToMatchAllProperties(updatedCon);
    }

    @Test
    void putNonExistingCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        con.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConMockMvc
            .perform(put(ENTITY_API_URL_ID, con.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(con)))
            .andExpect(status().isBadRequest());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        con.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(con))
            )
            .andExpect(status().isBadRequest());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        con.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(con)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateConWithPatch() throws Exception {
        // Initialize the database
        insertedCon = conRepository.save(con);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the con using partial update
        Con partialUpdatedCon = new Con();
        partialUpdatedCon.setId(con.getId());

        partialUpdatedCon.value(UPDATED_VALUE);

        restConMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCon.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCon))
            )
            .andExpect(status().isOk());

        // Validate the Con in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertConUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedCon, con), getPersistedCon(con));
    }

    @Test
    void fullUpdateConWithPatch() throws Exception {
        // Initialize the database
        insertedCon = conRepository.save(con);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the con using partial update
        Con partialUpdatedCon = new Con();
        partialUpdatedCon.setId(con.getId());

        partialUpdatedCon.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restConMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCon.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCon))
            )
            .andExpect(status().isOk());

        // Validate the Con in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertConUpdatableFieldsEquals(partialUpdatedCon, getPersistedCon(partialUpdatedCon));
    }

    @Test
    void patchNonExistingCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        con.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConMockMvc
            .perform(patch(ENTITY_API_URL_ID, con.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(con)))
            .andExpect(status().isBadRequest());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        con.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(con))
            )
            .andExpect(status().isBadRequest());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        con.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(con)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Con in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCon() throws Exception {
        // Initialize the database
        insertedCon = conRepository.save(con);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the con
        restConMockMvc.perform(delete(ENTITY_API_URL_ID, con.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return conRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Con getPersistedCon(Con con) {
        return conRepository.findById(con.getId()).orElseThrow();
    }

    protected void assertPersistedConToMatchAllProperties(Con expectedCon) {
        assertConAllPropertiesEquals(expectedCon, getPersistedCon(expectedCon));
    }

    protected void assertPersistedConToMatchUpdatableProperties(Con expectedCon) {
        assertConAllUpdatablePropertiesEquals(expectedCon, getPersistedCon(expectedCon));
    }
}
