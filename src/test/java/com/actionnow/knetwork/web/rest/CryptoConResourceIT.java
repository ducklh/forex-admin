package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.CryptoConAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.CryptoCon;
import com.actionnow.knetwork.repository.CryptoConRepository;
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
 * Integration tests for the {@link CryptoConResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CryptoConResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/crypto-cons";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CryptoConRepository cryptoConRepository;

    @Autowired
    private MockMvc restCryptoConMockMvc;

    private CryptoCon cryptoCon;

    private CryptoCon insertedCryptoCon;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoCon createEntity() {
        return new CryptoCon().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoCon createUpdatedEntity() {
        return new CryptoCon().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        cryptoCon = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCryptoCon != null) {
            cryptoConRepository.delete(insertedCryptoCon);
            insertedCryptoCon = null;
        }
    }

    @Test
    void createCryptoCon() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CryptoCon
        var returnedCryptoCon = om.readValue(
            restCryptoConMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoCon)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CryptoCon.class
        );

        // Validate the CryptoCon in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCryptoConUpdatableFieldsEquals(returnedCryptoCon, getPersistedCryptoCon(returnedCryptoCon));

        insertedCryptoCon = returnedCryptoCon;
    }

    @Test
    void createCryptoConWithExistingId() throws Exception {
        // Create the CryptoCon with an existing ID
        cryptoCon.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCryptoConMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoCon)))
            .andExpect(status().isBadRequest());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        cryptoCon.setValue(null);

        // Create the CryptoCon, which fails.

        restCryptoConMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoCon)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCryptoCons() throws Exception {
        // Initialize the database
        insertedCryptoCon = cryptoConRepository.save(cryptoCon);

        // Get all the cryptoConList
        restCryptoConMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cryptoCon.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getCryptoCon() throws Exception {
        // Initialize the database
        insertedCryptoCon = cryptoConRepository.save(cryptoCon);

        // Get the cryptoCon
        restCryptoConMockMvc
            .perform(get(ENTITY_API_URL_ID, cryptoCon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cryptoCon.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingCryptoCon() throws Exception {
        // Get the cryptoCon
        restCryptoConMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCryptoCon() throws Exception {
        // Initialize the database
        insertedCryptoCon = cryptoConRepository.save(cryptoCon);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoCon
        CryptoCon updatedCryptoCon = cryptoConRepository.findById(cryptoCon.getId()).orElseThrow();
        updatedCryptoCon.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoConMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCryptoCon.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCryptoCon))
            )
            .andExpect(status().isOk());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCryptoConToMatchAllProperties(updatedCryptoCon);
    }

    @Test
    void putNonExistingCryptoCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoCon.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoConMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cryptoCon.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoCon))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCryptoCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoCon.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoConMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoCon))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCryptoCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoCon.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoConMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoCon)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCryptoConWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoCon = cryptoConRepository.save(cryptoCon);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoCon using partial update
        CryptoCon partialUpdatedCryptoCon = new CryptoCon();
        partialUpdatedCryptoCon.setId(cryptoCon.getId());

        partialUpdatedCryptoCon.value(UPDATED_VALUE);

        restCryptoConMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoCon.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoCon))
            )
            .andExpect(status().isOk());

        // Validate the CryptoCon in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoConUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCryptoCon, cryptoCon),
            getPersistedCryptoCon(cryptoCon)
        );
    }

    @Test
    void fullUpdateCryptoConWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoCon = cryptoConRepository.save(cryptoCon);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoCon using partial update
        CryptoCon partialUpdatedCryptoCon = new CryptoCon();
        partialUpdatedCryptoCon.setId(cryptoCon.getId());

        partialUpdatedCryptoCon.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoConMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoCon.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoCon))
            )
            .andExpect(status().isOk());

        // Validate the CryptoCon in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoConUpdatableFieldsEquals(partialUpdatedCryptoCon, getPersistedCryptoCon(partialUpdatedCryptoCon));
    }

    @Test
    void patchNonExistingCryptoCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoCon.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoConMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cryptoCon.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoCon))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCryptoCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoCon.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoConMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoCon))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCryptoCon() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoCon.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoConMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(cryptoCon)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoCon in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCryptoCon() throws Exception {
        // Initialize the database
        insertedCryptoCon = cryptoConRepository.save(cryptoCon);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the cryptoCon
        restCryptoConMockMvc
            .perform(delete(ENTITY_API_URL_ID, cryptoCon.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return cryptoConRepository.count();
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

    protected CryptoCon getPersistedCryptoCon(CryptoCon cryptoCon) {
        return cryptoConRepository.findById(cryptoCon.getId()).orElseThrow();
    }

    protected void assertPersistedCryptoConToMatchAllProperties(CryptoCon expectedCryptoCon) {
        assertCryptoConAllPropertiesEquals(expectedCryptoCon, getPersistedCryptoCon(expectedCryptoCon));
    }

    protected void assertPersistedCryptoConToMatchUpdatableProperties(CryptoCon expectedCryptoCon) {
        assertCryptoConAllUpdatablePropertiesEquals(expectedCryptoCon, getPersistedCryptoCon(expectedCryptoCon));
    }
}
