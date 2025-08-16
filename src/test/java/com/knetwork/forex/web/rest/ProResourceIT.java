package com.knetwork.forex.web.rest;

import static com.knetwork.forex.domain.ProAsserts.*;
import static com.knetwork.forex.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knetwork.forex.IntegrationTest;
import com.knetwork.forex.domain.Pro;
import com.knetwork.forex.repository.ProRepository;
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
 * Integration tests for the {@link ProResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pros";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ProRepository proRepository;

    @Autowired
    private MockMvc restProMockMvc;

    private Pro pro;

    private Pro insertedPro;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pro createEntity() {
        return new Pro().text(DEFAULT_TEXT);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pro createUpdatedEntity() {
        return new Pro().text(UPDATED_TEXT);
    }

    @BeforeEach
    public void initTest() {
        pro = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedPro != null) {
            proRepository.delete(insertedPro);
            insertedPro = null;
        }
    }

    @Test
    void createPro() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Pro
        var returnedPro = om.readValue(
            restProMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pro)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Pro.class
        );

        // Validate the Pro in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertProUpdatableFieldsEquals(returnedPro, getPersistedPro(returnedPro));

        insertedPro = returnedPro;
    }

    @Test
    void createProWithExistingId() throws Exception {
        // Create the Pro with an existing ID
        pro.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pro)))
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkTextIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        pro.setText(null);

        // Create the Pro, which fails.

        restProMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pro)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllPros() throws Exception {
        // Initialize the database
        insertedPro = proRepository.save(pro);

        // Get all the proList
        restProMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pro.getId())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT)));
    }

    @Test
    void getPro() throws Exception {
        // Initialize the database
        insertedPro = proRepository.save(pro);

        // Get the pro
        restProMockMvc
            .perform(get(ENTITY_API_URL_ID, pro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pro.getId()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT));
    }

    @Test
    void getNonExistingPro() throws Exception {
        // Get the pro
        restProMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingPro() throws Exception {
        // Initialize the database
        insertedPro = proRepository.save(pro);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the pro
        Pro updatedPro = proRepository.findById(pro.getId()).orElseThrow();
        updatedPro.text(UPDATED_TEXT);

        restProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPro.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(updatedPro))
            )
            .andExpect(status().isOk());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedProToMatchAllProperties(updatedPro);
    }

    @Test
    void putNonExistingPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pro.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(put(ENTITY_API_URL_ID, pro.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pro)))
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(pro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(pro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateProWithPatch() throws Exception {
        // Initialize the database
        insertedPro = proRepository.save(pro);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the pro using partial update
        Pro partialUpdatedPro = new Pro();
        partialUpdatedPro.setId(pro.getId());

        partialUpdatedPro.text(UPDATED_TEXT);

        restProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPro.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPro))
            )
            .andExpect(status().isOk());

        // Validate the Pro in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedPro, pro), getPersistedPro(pro));
    }

    @Test
    void fullUpdateProWithPatch() throws Exception {
        // Initialize the database
        insertedPro = proRepository.save(pro);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the pro using partial update
        Pro partialUpdatedPro = new Pro();
        partialUpdatedPro.setId(pro.getId());

        partialUpdatedPro.text(UPDATED_TEXT);

        restProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPro.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPro))
            )
            .andExpect(status().isOk());

        // Validate the Pro in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProUpdatableFieldsEquals(partialUpdatedPro, getPersistedPro(partialUpdatedPro));
    }

    @Test
    void patchNonExistingPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pro.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(patch(ENTITY_API_URL_ID, pro.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(pro)))
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(pro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        pro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(pro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePro() throws Exception {
        // Initialize the database
        insertedPro = proRepository.save(pro);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the pro
        restProMockMvc.perform(delete(ENTITY_API_URL_ID, pro.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return proRepository.count();
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

    protected Pro getPersistedPro(Pro pro) {
        return proRepository.findById(pro.getId()).orElseThrow();
    }

    protected void assertPersistedProToMatchAllProperties(Pro expectedPro) {
        assertProAllPropertiesEquals(expectedPro, getPersistedPro(expectedPro));
    }

    protected void assertPersistedProToMatchUpdatableProperties(Pro expectedPro) {
        assertProAllUpdatablePropertiesEquals(expectedPro, getPersistedPro(expectedPro));
    }
}
