package com.knetwork.forex.web.rest;

import static com.knetwork.forex.domain.FeatureAsserts.*;
import static com.knetwork.forex.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knetwork.forex.IntegrationTest;
import com.knetwork.forex.domain.Feature;
import com.knetwork.forex.repository.FeatureRepository;
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
 * Integration tests for the {@link FeatureResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FeatureResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/features";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private MockMvc restFeatureMockMvc;

    private Feature feature;

    private Feature insertedFeature;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Feature createEntity() {
        return new Feature().name(DEFAULT_NAME);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Feature createUpdatedEntity() {
        return new Feature().name(UPDATED_NAME);
    }

    @BeforeEach
    public void initTest() {
        feature = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedFeature != null) {
            featureRepository.delete(insertedFeature);
            insertedFeature = null;
        }
    }

    @Test
    void createFeature() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Feature
        var returnedFeature = om.readValue(
            restFeatureMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(feature)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Feature.class
        );

        // Validate the Feature in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertFeatureUpdatableFieldsEquals(returnedFeature, getPersistedFeature(returnedFeature));

        insertedFeature = returnedFeature;
    }

    @Test
    void createFeatureWithExistingId() throws Exception {
        // Create the Feature with an existing ID
        feature.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFeatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(feature)))
            .andExpect(status().isBadRequest());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        feature.setName(null);

        // Create the Feature, which fails.

        restFeatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(feature)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllFeatures() throws Exception {
        // Initialize the database
        insertedFeature = featureRepository.save(feature);

        // Get all the featureList
        restFeatureMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(feature.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    void getFeature() throws Exception {
        // Initialize the database
        insertedFeature = featureRepository.save(feature);

        // Get the feature
        restFeatureMockMvc
            .perform(get(ENTITY_API_URL_ID, feature.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(feature.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    void getNonExistingFeature() throws Exception {
        // Get the feature
        restFeatureMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingFeature() throws Exception {
        // Initialize the database
        insertedFeature = featureRepository.save(feature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the feature
        Feature updatedFeature = featureRepository.findById(feature.getId()).orElseThrow();
        updatedFeature.name(UPDATED_NAME);

        restFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFeature.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedFeature))
            )
            .andExpect(status().isOk());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedFeatureToMatchAllProperties(updatedFeature);
    }

    @Test
    void putNonExistingFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        feature.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFeatureMockMvc
            .perform(put(ENTITY_API_URL_ID, feature.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(feature)))
            .andExpect(status().isBadRequest());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        feature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(feature))
            )
            .andExpect(status().isBadRequest());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        feature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeatureMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(feature)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateFeatureWithPatch() throws Exception {
        // Initialize the database
        insertedFeature = featureRepository.save(feature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the feature using partial update
        Feature partialUpdatedFeature = new Feature();
        partialUpdatedFeature.setId(feature.getId());

        restFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedFeature))
            )
            .andExpect(status().isOk());

        // Validate the Feature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertFeatureUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedFeature, feature), getPersistedFeature(feature));
    }

    @Test
    void fullUpdateFeatureWithPatch() throws Exception {
        // Initialize the database
        insertedFeature = featureRepository.save(feature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the feature using partial update
        Feature partialUpdatedFeature = new Feature();
        partialUpdatedFeature.setId(feature.getId());

        partialUpdatedFeature.name(UPDATED_NAME);

        restFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedFeature))
            )
            .andExpect(status().isOk());

        // Validate the Feature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertFeatureUpdatableFieldsEquals(partialUpdatedFeature, getPersistedFeature(partialUpdatedFeature));
    }

    @Test
    void patchNonExistingFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        feature.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, feature.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(feature))
            )
            .andExpect(status().isBadRequest());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        feature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(feature))
            )
            .andExpect(status().isBadRequest());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        feature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeatureMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(feature)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Feature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteFeature() throws Exception {
        // Initialize the database
        insertedFeature = featureRepository.save(feature);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the feature
        restFeatureMockMvc
            .perform(delete(ENTITY_API_URL_ID, feature.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return featureRepository.count();
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

    protected Feature getPersistedFeature(Feature feature) {
        return featureRepository.findById(feature.getId()).orElseThrow();
    }

    protected void assertPersistedFeatureToMatchAllProperties(Feature expectedFeature) {
        assertFeatureAllPropertiesEquals(expectedFeature, getPersistedFeature(expectedFeature));
    }

    protected void assertPersistedFeatureToMatchUpdatableProperties(Feature expectedFeature) {
        assertFeatureAllUpdatablePropertiesEquals(expectedFeature, getPersistedFeature(expectedFeature));
    }
}
