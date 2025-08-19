package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.CryptoPaymentMethodAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.CryptoPaymentMethod;
import com.actionnow.knetwork.repository.CryptoPaymentMethodRepository;
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
 * Integration tests for the {@link CryptoPaymentMethodResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CryptoPaymentMethodResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/crypto-payment-methods";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CryptoPaymentMethodRepository cryptoPaymentMethodRepository;

    @Autowired
    private MockMvc restCryptoPaymentMethodMockMvc;

    private CryptoPaymentMethod cryptoPaymentMethod;

    private CryptoPaymentMethod insertedCryptoPaymentMethod;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoPaymentMethod createEntity() {
        return new CryptoPaymentMethod().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoPaymentMethod createUpdatedEntity() {
        return new CryptoPaymentMethod().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        cryptoPaymentMethod = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCryptoPaymentMethod != null) {
            cryptoPaymentMethodRepository.delete(insertedCryptoPaymentMethod);
            insertedCryptoPaymentMethod = null;
        }
    }

    @Test
    void createCryptoPaymentMethod() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CryptoPaymentMethod
        var returnedCryptoPaymentMethod = om.readValue(
            restCryptoPaymentMethodMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPaymentMethod)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CryptoPaymentMethod.class
        );

        // Validate the CryptoPaymentMethod in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCryptoPaymentMethodUpdatableFieldsEquals(
            returnedCryptoPaymentMethod,
            getPersistedCryptoPaymentMethod(returnedCryptoPaymentMethod)
        );

        insertedCryptoPaymentMethod = returnedCryptoPaymentMethod;
    }

    @Test
    void createCryptoPaymentMethodWithExistingId() throws Exception {
        // Create the CryptoPaymentMethod with an existing ID
        cryptoPaymentMethod.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCryptoPaymentMethodMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPaymentMethod)))
            .andExpect(status().isBadRequest());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        cryptoPaymentMethod.setValue(null);

        // Create the CryptoPaymentMethod, which fails.

        restCryptoPaymentMethodMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPaymentMethod)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCryptoPaymentMethods() throws Exception {
        // Initialize the database
        insertedCryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);

        // Get all the cryptoPaymentMethodList
        restCryptoPaymentMethodMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cryptoPaymentMethod.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getCryptoPaymentMethod() throws Exception {
        // Initialize the database
        insertedCryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);

        // Get the cryptoPaymentMethod
        restCryptoPaymentMethodMockMvc
            .perform(get(ENTITY_API_URL_ID, cryptoPaymentMethod.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cryptoPaymentMethod.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingCryptoPaymentMethod() throws Exception {
        // Get the cryptoPaymentMethod
        restCryptoPaymentMethodMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCryptoPaymentMethod() throws Exception {
        // Initialize the database
        insertedCryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoPaymentMethod
        CryptoPaymentMethod updatedCryptoPaymentMethod = cryptoPaymentMethodRepository.findById(cryptoPaymentMethod.getId()).orElseThrow();
        updatedCryptoPaymentMethod.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoPaymentMethodMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCryptoPaymentMethod.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCryptoPaymentMethod))
            )
            .andExpect(status().isOk());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCryptoPaymentMethodToMatchAllProperties(updatedCryptoPaymentMethod);
    }

    @Test
    void putNonExistingCryptoPaymentMethod() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPaymentMethod.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoPaymentMethodMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cryptoPaymentMethod.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoPaymentMethod))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCryptoPaymentMethod() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPaymentMethod.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoPaymentMethodMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoPaymentMethod))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCryptoPaymentMethod() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPaymentMethod.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoPaymentMethodMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoPaymentMethod)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCryptoPaymentMethodWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoPaymentMethod using partial update
        CryptoPaymentMethod partialUpdatedCryptoPaymentMethod = new CryptoPaymentMethod();
        partialUpdatedCryptoPaymentMethod.setId(cryptoPaymentMethod.getId());

        restCryptoPaymentMethodMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoPaymentMethod.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoPaymentMethod))
            )
            .andExpect(status().isOk());

        // Validate the CryptoPaymentMethod in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoPaymentMethodUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCryptoPaymentMethod, cryptoPaymentMethod),
            getPersistedCryptoPaymentMethod(cryptoPaymentMethod)
        );
    }

    @Test
    void fullUpdateCryptoPaymentMethodWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoPaymentMethod using partial update
        CryptoPaymentMethod partialUpdatedCryptoPaymentMethod = new CryptoPaymentMethod();
        partialUpdatedCryptoPaymentMethod.setId(cryptoPaymentMethod.getId());

        partialUpdatedCryptoPaymentMethod.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCryptoPaymentMethodMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoPaymentMethod.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoPaymentMethod))
            )
            .andExpect(status().isOk());

        // Validate the CryptoPaymentMethod in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoPaymentMethodUpdatableFieldsEquals(
            partialUpdatedCryptoPaymentMethod,
            getPersistedCryptoPaymentMethod(partialUpdatedCryptoPaymentMethod)
        );
    }

    @Test
    void patchNonExistingCryptoPaymentMethod() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPaymentMethod.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoPaymentMethodMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cryptoPaymentMethod.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoPaymentMethod))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCryptoPaymentMethod() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPaymentMethod.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoPaymentMethodMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoPaymentMethod))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCryptoPaymentMethod() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoPaymentMethod.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoPaymentMethodMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(cryptoPaymentMethod)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoPaymentMethod in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCryptoPaymentMethod() throws Exception {
        // Initialize the database
        insertedCryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the cryptoPaymentMethod
        restCryptoPaymentMethodMockMvc
            .perform(delete(ENTITY_API_URL_ID, cryptoPaymentMethod.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return cryptoPaymentMethodRepository.count();
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

    protected CryptoPaymentMethod getPersistedCryptoPaymentMethod(CryptoPaymentMethod cryptoPaymentMethod) {
        return cryptoPaymentMethodRepository.findById(cryptoPaymentMethod.getId()).orElseThrow();
    }

    protected void assertPersistedCryptoPaymentMethodToMatchAllProperties(CryptoPaymentMethod expectedCryptoPaymentMethod) {
        assertCryptoPaymentMethodAllPropertiesEquals(
            expectedCryptoPaymentMethod,
            getPersistedCryptoPaymentMethod(expectedCryptoPaymentMethod)
        );
    }

    protected void assertPersistedCryptoPaymentMethodToMatchUpdatableProperties(CryptoPaymentMethod expectedCryptoPaymentMethod) {
        assertCryptoPaymentMethodAllUpdatablePropertiesEquals(
            expectedCryptoPaymentMethod,
            getPersistedCryptoPaymentMethod(expectedCryptoPaymentMethod)
        );
    }
}
