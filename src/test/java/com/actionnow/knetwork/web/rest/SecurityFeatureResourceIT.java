package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.SecurityFeatureAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.SecurityFeature;
import com.actionnow.knetwork.repository.SecurityFeatureRepository;
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
 * Integration tests for the {@link SecurityFeatureResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SecurityFeatureResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/security-features";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SecurityFeatureRepository securityFeatureRepository;

    @Autowired
    private MockMvc restSecurityFeatureMockMvc;

    private SecurityFeature securityFeature;

    private SecurityFeature insertedSecurityFeature;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SecurityFeature createEntity() {
        return new SecurityFeature().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SecurityFeature createUpdatedEntity() {
        return new SecurityFeature().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        securityFeature = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedSecurityFeature != null) {
            securityFeatureRepository.delete(insertedSecurityFeature);
            insertedSecurityFeature = null;
        }
    }

    @Test
    void createSecurityFeature() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the SecurityFeature
        var returnedSecurityFeature = om.readValue(
            restSecurityFeatureMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(securityFeature)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            SecurityFeature.class
        );

        // Validate the SecurityFeature in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertSecurityFeatureUpdatableFieldsEquals(returnedSecurityFeature, getPersistedSecurityFeature(returnedSecurityFeature));

        insertedSecurityFeature = returnedSecurityFeature;
    }

    @Test
    void createSecurityFeatureWithExistingId() throws Exception {
        // Create the SecurityFeature with an existing ID
        securityFeature.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSecurityFeatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(securityFeature)))
            .andExpect(status().isBadRequest());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        securityFeature.setValue(null);

        // Create the SecurityFeature, which fails.

        restSecurityFeatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(securityFeature)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllSecurityFeatures() throws Exception {
        // Initialize the database
        insertedSecurityFeature = securityFeatureRepository.save(securityFeature);

        // Get all the securityFeatureList
        restSecurityFeatureMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(securityFeature.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getSecurityFeature() throws Exception {
        // Initialize the database
        insertedSecurityFeature = securityFeatureRepository.save(securityFeature);

        // Get the securityFeature
        restSecurityFeatureMockMvc
            .perform(get(ENTITY_API_URL_ID, securityFeature.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(securityFeature.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingSecurityFeature() throws Exception {
        // Get the securityFeature
        restSecurityFeatureMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingSecurityFeature() throws Exception {
        // Initialize the database
        insertedSecurityFeature = securityFeatureRepository.save(securityFeature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the securityFeature
        SecurityFeature updatedSecurityFeature = securityFeatureRepository.findById(securityFeature.getId()).orElseThrow();
        updatedSecurityFeature.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restSecurityFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSecurityFeature.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedSecurityFeature))
            )
            .andExpect(status().isOk());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSecurityFeatureToMatchAllProperties(updatedSecurityFeature);
    }

    @Test
    void putNonExistingSecurityFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        securityFeature.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSecurityFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, securityFeature.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(securityFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchSecurityFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        securityFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSecurityFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(securityFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamSecurityFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        securityFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSecurityFeatureMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(securityFeature)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateSecurityFeatureWithPatch() throws Exception {
        // Initialize the database
        insertedSecurityFeature = securityFeatureRepository.save(securityFeature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the securityFeature using partial update
        SecurityFeature partialUpdatedSecurityFeature = new SecurityFeature();
        partialUpdatedSecurityFeature.setId(securityFeature.getId());

        restSecurityFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSecurityFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSecurityFeature))
            )
            .andExpect(status().isOk());

        // Validate the SecurityFeature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSecurityFeatureUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedSecurityFeature, securityFeature),
            getPersistedSecurityFeature(securityFeature)
        );
    }

    @Test
    void fullUpdateSecurityFeatureWithPatch() throws Exception {
        // Initialize the database
        insertedSecurityFeature = securityFeatureRepository.save(securityFeature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the securityFeature using partial update
        SecurityFeature partialUpdatedSecurityFeature = new SecurityFeature();
        partialUpdatedSecurityFeature.setId(securityFeature.getId());

        partialUpdatedSecurityFeature.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restSecurityFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSecurityFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSecurityFeature))
            )
            .andExpect(status().isOk());

        // Validate the SecurityFeature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSecurityFeatureUpdatableFieldsEquals(
            partialUpdatedSecurityFeature,
            getPersistedSecurityFeature(partialUpdatedSecurityFeature)
        );
    }

    @Test
    void patchNonExistingSecurityFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        securityFeature.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSecurityFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, securityFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(securityFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchSecurityFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        securityFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSecurityFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(securityFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamSecurityFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        securityFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSecurityFeatureMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(securityFeature)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SecurityFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteSecurityFeature() throws Exception {
        // Initialize the database
        insertedSecurityFeature = securityFeatureRepository.save(securityFeature);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the securityFeature
        restSecurityFeatureMockMvc
            .perform(delete(ENTITY_API_URL_ID, securityFeature.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return securityFeatureRepository.count();
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

    protected SecurityFeature getPersistedSecurityFeature(SecurityFeature securityFeature) {
        return securityFeatureRepository.findById(securityFeature.getId()).orElseThrow();
    }

    protected void assertPersistedSecurityFeatureToMatchAllProperties(SecurityFeature expectedSecurityFeature) {
        assertSecurityFeatureAllPropertiesEquals(expectedSecurityFeature, getPersistedSecurityFeature(expectedSecurityFeature));
    }

    protected void assertPersistedSecurityFeatureToMatchUpdatableProperties(SecurityFeature expectedSecurityFeature) {
        assertSecurityFeatureAllUpdatablePropertiesEquals(expectedSecurityFeature, getPersistedSecurityFeature(expectedSecurityFeature));
    }
}
