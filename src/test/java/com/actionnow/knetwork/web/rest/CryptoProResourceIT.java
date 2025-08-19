package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.CryptoProAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.CryptoPro;
import com.actionnow.knetwork.repository.CryptoProRepository;
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
 * Integration tests for the {@link CryptoProResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CryptoProResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/crypto-pros";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CryptoProRepository cryptoProRepository;

    @Autowired
    private MockMvc restCryptoProMockMvc;

    private CryptoPro cryptoPro;

    private CryptoPro insertedCryptoPro;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoPro createEntity() {
        return new CryptoPro().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoPro createUpdatedEntity() {
        return new CryptoPro().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        cryptoPro = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCryptoPro != null) {
            cryptoProRepository.delete(insertedCryptoPro);
            insertedCryptoPro = null;
        }
    }

    @Test
    void createCryptoPro() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CryptoPro
        var returnedCryptoPro = om.readValue(
            restCryptoProMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPro)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CryptoPro.class
        );

        // Validate the CryptoPro in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCryptoProUpdatableFieldsEquals(returnedCryptoPro, getPersistedCryptoPro(returnedCryptoPro));

        insertedCryptoPro = returnedCryptoPro;
    }

    @Test
    void createCryptoProWithExistingId() throws Exception {
        // Create the CryptoPro with an existing ID
        cryptoPro.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCryptoProMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPro)))
            .andExpect(status().isBadRequest());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        cryptoPro.setValue(null);

        // Create the CryptoPro, which fails.

        restCryptoProMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPro)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCryptoPros() throws Exception {
        // Initialize the database
        insertedCryptoPro = cryptoProRepository.save(cryptoPro);

        // Get all the cryptoProList
        restCryptoProMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cryptoPro.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getCryptoPro() throws Exception {
        // Initialize the database
        insertedCryptoPro = cryptoProRepository.save(cryptoPro);

        // Get the cryptoPro
        restCryptoProMockMvc
            .perform(get(ENTITY_API_URL_ID, cryptoPro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cryptoPro.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingCryptoPro() throws Exception {
        // Get the cryptoPro
        restCryptoProMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCryptoPro() throws Exception {
        // Initialize the database
        insertedCryptoPro = cryptoProRepository.save(cryptoPro);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoPro
        CryptoPro updatedCryptoPro = cryptoProRepository.findById(cryptoPro.getId()).orElseThrow();
        updatedCryptoPro.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCryptoPro.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCryptoPro))
            )
            .andExpect(status().isOk());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCryptoProToMatchAllProperties(updatedCryptoPro);
    }

    @Test
    void putNonExistingCryptoPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPro.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cryptoPro.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPro))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCryptoPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoProMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoPro))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCryptoPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoProMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCryptoProWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoPro = cryptoProRepository.save(cryptoPro);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoPro using partial update
        CryptoPro partialUpdatedCryptoPro = new CryptoPro();
        partialUpdatedCryptoPro.setId(cryptoPro.getId());

        partialUpdatedCryptoPro.value(UPDATED_VALUE);

        restCryptoProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoPro.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoPro))
            )
            .andExpect(status().isOk());

        // Validate the CryptoPro in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoProUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCryptoPro, cryptoPro),
            getPersistedCryptoPro(cryptoPro)
        );
    }

    @Test
    void fullUpdateCryptoProWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoPro = cryptoProRepository.save(cryptoPro);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoPro using partial update
        CryptoPro partialUpdatedCryptoPro = new CryptoPro();
        partialUpdatedCryptoPro.setId(cryptoPro.getId());

        partialUpdatedCryptoPro.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoPro.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoPro))
            )
            .andExpect(status().isOk());

        // Validate the CryptoPro in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoProUpdatableFieldsEquals(partialUpdatedCryptoPro, getPersistedCryptoPro(partialUpdatedCryptoPro));
    }

    @Test
    void patchNonExistingCryptoPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPro.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cryptoPro.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoPro))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCryptoPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoProMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoPro))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCryptoPro() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPro.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoProMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(cryptoPro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoPro in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCryptoPro() throws Exception {
        // Initialize the database
        insertedCryptoPro = cryptoProRepository.save(cryptoPro);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the cryptoPro
        restCryptoProMockMvc
            .perform(delete(ENTITY_API_URL_ID, cryptoPro.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return cryptoProRepository.count();
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

    protected CryptoPro getPersistedCryptoPro(CryptoPro cryptoPro) {
        return cryptoProRepository.findById(cryptoPro.getId()).orElseThrow();
    }

    protected void assertPersistedCryptoProToMatchAllProperties(CryptoPro expectedCryptoPro) {
        assertCryptoProAllPropertiesEquals(expectedCryptoPro, getPersistedCryptoPro(expectedCryptoPro));
    }

    protected void assertPersistedCryptoProToMatchUpdatableProperties(CryptoPro expectedCryptoPro) {
        assertCryptoProAllUpdatablePropertiesEquals(expectedCryptoPro, getPersistedCryptoPro(expectedCryptoPro));
    }
}
