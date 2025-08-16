package com.knetwork.forex.web.rest;

import static com.knetwork.forex.domain.SupportAsserts.*;
import static com.knetwork.forex.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knetwork.forex.IntegrationTest;
import com.knetwork.forex.domain.Support;
import com.knetwork.forex.repository.SupportRepository;
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
 * Integration tests for the {@link SupportResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SupportResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/supports";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SupportRepository supportRepository;

    @Autowired
    private MockMvc restSupportMockMvc;

    private Support support;

    private Support insertedSupport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Support createEntity() {
        return new Support().type(DEFAULT_TYPE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Support createUpdatedEntity() {
        return new Support().type(UPDATED_TYPE);
    }

    @BeforeEach
    public void initTest() {
        support = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedSupport != null) {
            supportRepository.delete(insertedSupport);
            insertedSupport = null;
        }
    }

    @Test
    void createSupport() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Support
        var returnedSupport = om.readValue(
            restSupportMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(support)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Support.class
        );

        // Validate the Support in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertSupportUpdatableFieldsEquals(returnedSupport, getPersistedSupport(returnedSupport));

        insertedSupport = returnedSupport;
    }

    @Test
    void createSupportWithExistingId() throws Exception {
        // Create the Support with an existing ID
        support.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupportMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(support)))
            .andExpect(status().isBadRequest());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        support.setType(null);

        // Create the Support, which fails.

        restSupportMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(support)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllSupports() throws Exception {
        // Initialize the database
        insertedSupport = supportRepository.save(support);

        // Get all the supportList
        restSupportMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(support.getId())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }

    @Test
    void getSupport() throws Exception {
        // Initialize the database
        insertedSupport = supportRepository.save(support);

        // Get the support
        restSupportMockMvc
            .perform(get(ENTITY_API_URL_ID, support.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(support.getId()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    void getNonExistingSupport() throws Exception {
        // Get the support
        restSupportMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingSupport() throws Exception {
        // Initialize the database
        insertedSupport = supportRepository.save(support);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the support
        Support updatedSupport = supportRepository.findById(support.getId()).orElseThrow();
        updatedSupport.type(UPDATED_TYPE);

        restSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSupport.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedSupport))
            )
            .andExpect(status().isOk());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSupportToMatchAllProperties(updatedSupport);
    }

    @Test
    void putNonExistingSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        support.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupportMockMvc
            .perform(put(ENTITY_API_URL_ID, support.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(support)))
            .andExpect(status().isBadRequest());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        support.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(support))
            )
            .andExpect(status().isBadRequest());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        support.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupportMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(support)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateSupportWithPatch() throws Exception {
        // Initialize the database
        insertedSupport = supportRepository.save(support);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the support using partial update
        Support partialUpdatedSupport = new Support();
        partialUpdatedSupport.setId(support.getId());

        restSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSupport))
            )
            .andExpect(status().isOk());

        // Validate the Support in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSupportUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedSupport, support), getPersistedSupport(support));
    }

    @Test
    void fullUpdateSupportWithPatch() throws Exception {
        // Initialize the database
        insertedSupport = supportRepository.save(support);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the support using partial update
        Support partialUpdatedSupport = new Support();
        partialUpdatedSupport.setId(support.getId());

        partialUpdatedSupport.type(UPDATED_TYPE);

        restSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSupport))
            )
            .andExpect(status().isOk());

        // Validate the Support in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSupportUpdatableFieldsEquals(partialUpdatedSupport, getPersistedSupport(partialUpdatedSupport));
    }

    @Test
    void patchNonExistingSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        support.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, support.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(support))
            )
            .andExpect(status().isBadRequest());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        support.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(support))
            )
            .andExpect(status().isBadRequest());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        support.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSupportMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(support)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Support in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteSupport() throws Exception {
        // Initialize the database
        insertedSupport = supportRepository.save(support);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the support
        restSupportMockMvc
            .perform(delete(ENTITY_API_URL_ID, support.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return supportRepository.count();
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

    protected Support getPersistedSupport(Support support) {
        return supportRepository.findById(support.getId()).orElseThrow();
    }

    protected void assertPersistedSupportToMatchAllProperties(Support expectedSupport) {
        assertSupportAllPropertiesEquals(expectedSupport, getPersistedSupport(expectedSupport));
    }

    protected void assertPersistedSupportToMatchUpdatableProperties(Support expectedSupport) {
        assertSupportAllUpdatablePropertiesEquals(expectedSupport, getPersistedSupport(expectedSupport));
    }
}
