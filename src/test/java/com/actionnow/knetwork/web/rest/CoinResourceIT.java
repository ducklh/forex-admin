package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.CoinAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.Coin;
import com.actionnow.knetwork.repository.CoinRepository;
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
 * Integration tests for the {@link CoinResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CoinResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/coins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private MockMvc restCoinMockMvc;

    private Coin coin;

    private Coin insertedCoin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Coin createEntity() {
        return new Coin().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Coin createUpdatedEntity() {
        return new Coin().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        coin = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCoin != null) {
            coinRepository.delete(insertedCoin);
            insertedCoin = null;
        }
    }

    @Test
    void createCoin() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Coin
        var returnedCoin = om.readValue(
            restCoinMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coin)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Coin.class
        );

        // Validate the Coin in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCoinUpdatableFieldsEquals(returnedCoin, getPersistedCoin(returnedCoin));

        insertedCoin = returnedCoin;
    }

    @Test
    void createCoinWithExistingId() throws Exception {
        // Create the Coin with an existing ID
        coin.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coin)))
            .andExpect(status().isBadRequest());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        coin.setValue(null);

        // Create the Coin, which fails.

        restCoinMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coin)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCoins() throws Exception {
        // Initialize the database
        insertedCoin = coinRepository.save(coin);

        // Get all the coinList
        restCoinMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coin.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getCoin() throws Exception {
        // Initialize the database
        insertedCoin = coinRepository.save(coin);

        // Get the coin
        restCoinMockMvc
            .perform(get(ENTITY_API_URL_ID, coin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(coin.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingCoin() throws Exception {
        // Get the coin
        restCoinMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCoin() throws Exception {
        // Initialize the database
        insertedCoin = coinRepository.save(coin);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the coin
        Coin updatedCoin = coinRepository.findById(coin.getId()).orElseThrow();
        updatedCoin.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCoinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCoin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCoin))
            )
            .andExpect(status().isOk());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCoinToMatchAllProperties(updatedCoin);
    }

    @Test
    void putNonExistingCoin() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coin.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoinMockMvc
            .perform(put(ENTITY_API_URL_ID, coin.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coin)))
            .andExpect(status().isBadRequest());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCoin() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coin.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoinMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(coin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCoin() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coin.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoinMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCoinWithPatch() throws Exception {
        // Initialize the database
        insertedCoin = coinRepository.save(coin);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the coin using partial update
        Coin partialUpdatedCoin = new Coin();
        partialUpdatedCoin.setId(coin.getId());

        partialUpdatedCoin.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCoinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCoin.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCoin))
            )
            .andExpect(status().isOk());

        // Validate the Coin in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCoinUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedCoin, coin), getPersistedCoin(coin));
    }

    @Test
    void fullUpdateCoinWithPatch() throws Exception {
        // Initialize the database
        insertedCoin = coinRepository.save(coin);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the coin using partial update
        Coin partialUpdatedCoin = new Coin();
        partialUpdatedCoin.setId(coin.getId());

        partialUpdatedCoin.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCoinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCoin.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCoin))
            )
            .andExpect(status().isOk());

        // Validate the Coin in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCoinUpdatableFieldsEquals(partialUpdatedCoin, getPersistedCoin(partialUpdatedCoin));
    }

    @Test
    void patchNonExistingCoin() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coin.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoinMockMvc
            .perform(patch(ENTITY_API_URL_ID, coin.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(coin)))
            .andExpect(status().isBadRequest());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCoin() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coin.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoinMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(coin))
            )
            .andExpect(status().isBadRequest());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCoin() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coin.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoinMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(coin)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Coin in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCoin() throws Exception {
        // Initialize the database
        insertedCoin = coinRepository.save(coin);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the coin
        restCoinMockMvc
            .perform(delete(ENTITY_API_URL_ID, coin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return coinRepository.count();
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

    protected Coin getPersistedCoin(Coin coin) {
        return coinRepository.findById(coin.getId()).orElseThrow();
    }

    protected void assertPersistedCoinToMatchAllProperties(Coin expectedCoin) {
        assertCoinAllPropertiesEquals(expectedCoin, getPersistedCoin(expectedCoin));
    }

    protected void assertPersistedCoinToMatchUpdatableProperties(Coin expectedCoin) {
        assertCoinAllUpdatablePropertiesEquals(expectedCoin, getPersistedCoin(expectedCoin));
    }
}
