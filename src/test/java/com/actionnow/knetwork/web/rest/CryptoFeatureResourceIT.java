package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.CryptoFeatureAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.CryptoFeature;
import com.actionnow.knetwork.repository.CryptoFeatureRepository;
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
 * Integration tests for the {@link CryptoFeatureResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CryptoFeatureResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/crypto-features";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CryptoFeatureRepository cryptoFeatureRepository;

    @Autowired
    private MockMvc restCryptoFeatureMockMvc;

    private CryptoFeature cryptoFeature;

    private CryptoFeature insertedCryptoFeature;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoFeature createEntity() {
        return new CryptoFeature().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoFeature createUpdatedEntity() {
        return new CryptoFeature().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        cryptoFeature = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCryptoFeature != null) {
            cryptoFeatureRepository.delete(insertedCryptoFeature);
            insertedCryptoFeature = null;
        }
    }

    @Test
    void createCryptoFeature() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CryptoFeature
        var returnedCryptoFeature = om.readValue(
            restCryptoFeatureMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoFeature)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CryptoFeature.class
        );

        // Validate the CryptoFeature in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCryptoFeatureUpdatableFieldsEquals(returnedCryptoFeature, getPersistedCryptoFeature(returnedCryptoFeature));

        insertedCryptoFeature = returnedCryptoFeature;
    }

    @Test
    void createCryptoFeatureWithExistingId() throws Exception {
        // Create the CryptoFeature with an existing ID
        cryptoFeature.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCryptoFeatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoFeature)))
            .andExpect(status().isBadRequest());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        cryptoFeature.setValue(null);

        // Create the CryptoFeature, which fails.

        restCryptoFeatureMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoFeature)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCryptoFeatures() throws Exception {
        // Initialize the database
        insertedCryptoFeature = cryptoFeatureRepository.save(cryptoFeature);

        // Get all the cryptoFeatureList
        restCryptoFeatureMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cryptoFeature.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getCryptoFeature() throws Exception {
        // Initialize the database
        insertedCryptoFeature = cryptoFeatureRepository.save(cryptoFeature);

        // Get the cryptoFeature
        restCryptoFeatureMockMvc
            .perform(get(ENTITY_API_URL_ID, cryptoFeature.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cryptoFeature.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingCryptoFeature() throws Exception {
        // Get the cryptoFeature
        restCryptoFeatureMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCryptoFeature() throws Exception {
        // Initialize the database
        insertedCryptoFeature = cryptoFeatureRepository.save(cryptoFeature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoFeature
        CryptoFeature updatedCryptoFeature = cryptoFeatureRepository.findById(cryptoFeature.getId()).orElseThrow();
        updatedCryptoFeature.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCryptoFeature.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCryptoFeature))
            )
            .andExpect(status().isOk());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCryptoFeatureToMatchAllProperties(updatedCryptoFeature);
    }

    @Test
    void putNonExistingCryptoFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoFeature.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cryptoFeature.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCryptoFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoFeatureMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCryptoFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoFeatureMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoFeature)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCryptoFeatureWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoFeature = cryptoFeatureRepository.save(cryptoFeature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoFeature using partial update
        CryptoFeature partialUpdatedCryptoFeature = new CryptoFeature();
        partialUpdatedCryptoFeature.setId(cryptoFeature.getId());

        partialUpdatedCryptoFeature.value(UPDATED_VALUE);

        restCryptoFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoFeature))
            )
            .andExpect(status().isOk());

        // Validate the CryptoFeature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoFeatureUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCryptoFeature, cryptoFeature),
            getPersistedCryptoFeature(cryptoFeature)
        );
    }

    @Test
    void fullUpdateCryptoFeatureWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoFeature = cryptoFeatureRepository.save(cryptoFeature);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoFeature using partial update
        CryptoFeature partialUpdatedCryptoFeature = new CryptoFeature();
        partialUpdatedCryptoFeature.setId(cryptoFeature.getId());

        partialUpdatedCryptoFeature.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoFeature))
            )
            .andExpect(status().isOk());

        // Validate the CryptoFeature in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoFeatureUpdatableFieldsEquals(partialUpdatedCryptoFeature, getPersistedCryptoFeature(partialUpdatedCryptoFeature));
    }

    @Test
    void patchNonExistingCryptoFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoFeature.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cryptoFeature.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCryptoFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoFeatureMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoFeature))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCryptoFeature() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoFeature.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoFeatureMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(cryptoFeature)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoFeature in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCryptoFeature() throws Exception {
        // Initialize the database
        insertedCryptoFeature = cryptoFeatureRepository.save(cryptoFeature);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the cryptoFeature
        restCryptoFeatureMockMvc
            .perform(delete(ENTITY_API_URL_ID, cryptoFeature.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return cryptoFeatureRepository.count();
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

    protected CryptoFeature getPersistedCryptoFeature(CryptoFeature cryptoFeature) {
        return cryptoFeatureRepository.findById(cryptoFeature.getId()).orElseThrow();
    }

    protected void assertPersistedCryptoFeatureToMatchAllProperties(CryptoFeature expectedCryptoFeature) {
        assertCryptoFeatureAllPropertiesEquals(expectedCryptoFeature, getPersistedCryptoFeature(expectedCryptoFeature));
    }

    protected void assertPersistedCryptoFeatureToMatchUpdatableProperties(CryptoFeature expectedCryptoFeature) {
        assertCryptoFeatureAllUpdatablePropertiesEquals(expectedCryptoFeature, getPersistedCryptoFeature(expectedCryptoFeature));
    }
}
