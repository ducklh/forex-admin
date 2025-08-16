package com.knetwork.forex.web.rest;

import static com.knetwork.forex.domain.CryptoBrokerAsserts.*;
import static com.knetwork.forex.web.rest.TestUtil.createUpdateProxyForBean;
import static com.knetwork.forex.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knetwork.forex.IntegrationTest;
import com.knetwork.forex.domain.CryptoBroker;
import com.knetwork.forex.repository.CryptoBrokerRepository;
import java.math.BigDecimal;
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
 * Integration tests for the {@link CryptoBrokerResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CryptoBrokerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_LOGO = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_RATING = new BigDecimal(1);
    private static final BigDecimal UPDATED_RATING = new BigDecimal(2);

    private static final String DEFAULT_FEATURES = "AAAAAAAAAA";
    private static final String UPDATED_FEATURES = "BBBBBBBBBB";

    private static final String DEFAULT_REGULATION = "AAAAAAAAAA";
    private static final String UPDATED_REGULATION = "BBBBBBBBBB";

    private static final String DEFAULT_MIN_DEPOSIT = "AAAAAAAAAA";
    private static final String UPDATED_MIN_DEPOSIT = "BBBBBBBBBB";

    private static final String DEFAULT_TRADING_FEES = "AAAAAAAAAA";
    private static final String UPDATED_TRADING_FEES = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPORTED_COINS = "AAAAAAAAAA";
    private static final String UPDATED_SUPPORTED_COINS = "BBBBBBBBBB";

    private static final String DEFAULT_PROS = "AAAAAAAAAA";
    private static final String UPDATED_PROS = "BBBBBBBBBB";

    private static final String DEFAULT_CONS = "AAAAAAAAAA";
    private static final String UPDATED_CONS = "BBBBBBBBBB";

    private static final String DEFAULT_FOUNDED = "AAAAAAAAAA";
    private static final String UPDATED_FOUNDED = "BBBBBBBBBB";

    private static final String DEFAULT_HEADQUARTERS = "AAAAAAAAAA";
    private static final String UPDATED_HEADQUARTERS = "BBBBBBBBBB";

    private static final String DEFAULT_TRADING_VOLUME = "AAAAAAAAAA";
    private static final String UPDATED_TRADING_VOLUME = "BBBBBBBBBB";

    private static final String DEFAULT_SECURITY_FEATURES = "AAAAAAAAAA";
    private static final String UPDATED_SECURITY_FEATURES = "BBBBBBBBBB";

    private static final String DEFAULT_PAYMENT_METHODS = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_METHODS = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTOMER_SUPPORT = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_SUPPORT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_MOBILE_APP = false;
    private static final Boolean UPDATED_MOBILE_APP = true;

    private static final Boolean DEFAULT_API_SUPPORT = false;
    private static final Boolean UPDATED_API_SUPPORT = true;

    private static final String DEFAULT_DETAILED_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DETAILED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/crypto-brokers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CryptoBrokerRepository cryptoBrokerRepository;

    @Autowired
    private MockMvc restCryptoBrokerMockMvc;

    private CryptoBroker cryptoBroker;

    private CryptoBroker insertedCryptoBroker;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoBroker createEntity() {
        return new CryptoBroker()
            .name(DEFAULT_NAME)
            .logo(DEFAULT_LOGO)
            .url(DEFAULT_URL)
            .description(DEFAULT_DESCRIPTION)
            .rating(DEFAULT_RATING)
            .features(DEFAULT_FEATURES)
            .regulation(DEFAULT_REGULATION)
            .minDeposit(DEFAULT_MIN_DEPOSIT)
            .tradingFees(DEFAULT_TRADING_FEES)
            .supportedCoins(DEFAULT_SUPPORTED_COINS)
            .pros(DEFAULT_PROS)
            .cons(DEFAULT_CONS)
            .founded(DEFAULT_FOUNDED)
            .headquarters(DEFAULT_HEADQUARTERS)
            .tradingVolume(DEFAULT_TRADING_VOLUME)
            .securityFeatures(DEFAULT_SECURITY_FEATURES)
            .paymentMethods(DEFAULT_PAYMENT_METHODS)
            .customerSupport(DEFAULT_CUSTOMER_SUPPORT)
            .mobileApp(DEFAULT_MOBILE_APP)
            .apiSupport(DEFAULT_API_SUPPORT)
            .detailedDescription(DEFAULT_DETAILED_DESCRIPTION);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CryptoBroker createUpdatedEntity() {
        return new CryptoBroker()
            .name(UPDATED_NAME)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .features(UPDATED_FEATURES)
            .regulation(UPDATED_REGULATION)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .tradingFees(UPDATED_TRADING_FEES)
            .supportedCoins(UPDATED_SUPPORTED_COINS)
            .pros(UPDATED_PROS)
            .cons(UPDATED_CONS)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS)
            .tradingVolume(UPDATED_TRADING_VOLUME)
            .securityFeatures(UPDATED_SECURITY_FEATURES)
            .paymentMethods(UPDATED_PAYMENT_METHODS)
            .customerSupport(UPDATED_CUSTOMER_SUPPORT)
            .mobileApp(UPDATED_MOBILE_APP)
            .apiSupport(UPDATED_API_SUPPORT)
            .detailedDescription(UPDATED_DETAILED_DESCRIPTION);
    }

    @BeforeEach
    public void initTest() {
        cryptoBroker = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCryptoBroker != null) {
            cryptoBrokerRepository.delete(insertedCryptoBroker);
            insertedCryptoBroker = null;
        }
    }

    @Test
    void createCryptoBroker() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CryptoBroker
        var returnedCryptoBroker = om.readValue(
            restCryptoBrokerMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoBroker)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CryptoBroker.class
        );

        // Validate the CryptoBroker in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCryptoBrokerUpdatableFieldsEquals(returnedCryptoBroker, getPersistedCryptoBroker(returnedCryptoBroker));

        insertedCryptoBroker = returnedCryptoBroker;
    }

    @Test
    void createCryptoBrokerWithExistingId() throws Exception {
        // Create the CryptoBroker with an existing ID
        cryptoBroker.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCryptoBrokerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoBroker)))
            .andExpect(status().isBadRequest());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        cryptoBroker.setName(null);

        // Create the CryptoBroker, which fails.

        restCryptoBrokerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoBroker)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCryptoBrokers() throws Exception {
        // Initialize the database
        insertedCryptoBroker = cryptoBrokerRepository.save(cryptoBroker);

        // Get all the cryptoBrokerList
        restCryptoBrokerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cryptoBroker.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(sameNumber(DEFAULT_RATING))))
            .andExpect(jsonPath("$.[*].features").value(hasItem(DEFAULT_FEATURES)))
            .andExpect(jsonPath("$.[*].regulation").value(hasItem(DEFAULT_REGULATION)))
            .andExpect(jsonPath("$.[*].minDeposit").value(hasItem(DEFAULT_MIN_DEPOSIT)))
            .andExpect(jsonPath("$.[*].tradingFees").value(hasItem(DEFAULT_TRADING_FEES)))
            .andExpect(jsonPath("$.[*].supportedCoins").value(hasItem(DEFAULT_SUPPORTED_COINS)))
            .andExpect(jsonPath("$.[*].pros").value(hasItem(DEFAULT_PROS)))
            .andExpect(jsonPath("$.[*].cons").value(hasItem(DEFAULT_CONS)))
            .andExpect(jsonPath("$.[*].founded").value(hasItem(DEFAULT_FOUNDED)))
            .andExpect(jsonPath("$.[*].headquarters").value(hasItem(DEFAULT_HEADQUARTERS)))
            .andExpect(jsonPath("$.[*].tradingVolume").value(hasItem(DEFAULT_TRADING_VOLUME)))
            .andExpect(jsonPath("$.[*].securityFeatures").value(hasItem(DEFAULT_SECURITY_FEATURES)))
            .andExpect(jsonPath("$.[*].paymentMethods").value(hasItem(DEFAULT_PAYMENT_METHODS)))
            .andExpect(jsonPath("$.[*].customerSupport").value(hasItem(DEFAULT_CUSTOMER_SUPPORT)))
            .andExpect(jsonPath("$.[*].mobileApp").value(hasItem(DEFAULT_MOBILE_APP)))
            .andExpect(jsonPath("$.[*].apiSupport").value(hasItem(DEFAULT_API_SUPPORT)))
            .andExpect(jsonPath("$.[*].detailedDescription").value(hasItem(DEFAULT_DETAILED_DESCRIPTION)));
    }

    @Test
    void getCryptoBroker() throws Exception {
        // Initialize the database
        insertedCryptoBroker = cryptoBrokerRepository.save(cryptoBroker);

        // Get the cryptoBroker
        restCryptoBrokerMockMvc
            .perform(get(ENTITY_API_URL_ID, cryptoBroker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cryptoBroker.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.rating").value(sameNumber(DEFAULT_RATING)))
            .andExpect(jsonPath("$.features").value(DEFAULT_FEATURES))
            .andExpect(jsonPath("$.regulation").value(DEFAULT_REGULATION))
            .andExpect(jsonPath("$.minDeposit").value(DEFAULT_MIN_DEPOSIT))
            .andExpect(jsonPath("$.tradingFees").value(DEFAULT_TRADING_FEES))
            .andExpect(jsonPath("$.supportedCoins").value(DEFAULT_SUPPORTED_COINS))
            .andExpect(jsonPath("$.pros").value(DEFAULT_PROS))
            .andExpect(jsonPath("$.cons").value(DEFAULT_CONS))
            .andExpect(jsonPath("$.founded").value(DEFAULT_FOUNDED))
            .andExpect(jsonPath("$.headquarters").value(DEFAULT_HEADQUARTERS))
            .andExpect(jsonPath("$.tradingVolume").value(DEFAULT_TRADING_VOLUME))
            .andExpect(jsonPath("$.securityFeatures").value(DEFAULT_SECURITY_FEATURES))
            .andExpect(jsonPath("$.paymentMethods").value(DEFAULT_PAYMENT_METHODS))
            .andExpect(jsonPath("$.customerSupport").value(DEFAULT_CUSTOMER_SUPPORT))
            .andExpect(jsonPath("$.mobileApp").value(DEFAULT_MOBILE_APP))
            .andExpect(jsonPath("$.apiSupport").value(DEFAULT_API_SUPPORT))
            .andExpect(jsonPath("$.detailedDescription").value(DEFAULT_DETAILED_DESCRIPTION));
    }

    @Test
    void getNonExistingCryptoBroker() throws Exception {
        // Get the cryptoBroker
        restCryptoBrokerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCryptoBroker() throws Exception {
        // Initialize the database
        insertedCryptoBroker = cryptoBrokerRepository.save(cryptoBroker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoBroker
        CryptoBroker updatedCryptoBroker = cryptoBrokerRepository.findById(cryptoBroker.getId()).orElseThrow();
        updatedCryptoBroker
            .name(UPDATED_NAME)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .features(UPDATED_FEATURES)
            .regulation(UPDATED_REGULATION)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .tradingFees(UPDATED_TRADING_FEES)
            .supportedCoins(UPDATED_SUPPORTED_COINS)
            .pros(UPDATED_PROS)
            .cons(UPDATED_CONS)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS)
            .tradingVolume(UPDATED_TRADING_VOLUME)
            .securityFeatures(UPDATED_SECURITY_FEATURES)
            .paymentMethods(UPDATED_PAYMENT_METHODS)
            .customerSupport(UPDATED_CUSTOMER_SUPPORT)
            .mobileApp(UPDATED_MOBILE_APP)
            .apiSupport(UPDATED_API_SUPPORT)
            .detailedDescription(UPDATED_DETAILED_DESCRIPTION);

        restCryptoBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCryptoBroker.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCryptoBroker))
            )
            .andExpect(status().isOk());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCryptoBrokerToMatchAllProperties(updatedCryptoBroker);
    }

    @Test
    void putNonExistingCryptoBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoBroker.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cryptoBroker.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCryptoBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(cryptoBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCryptoBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoBrokerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(cryptoBroker)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCryptoBrokerWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoBroker = cryptoBrokerRepository.save(cryptoBroker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoBroker using partial update
        CryptoBroker partialUpdatedCryptoBroker = new CryptoBroker();
        partialUpdatedCryptoBroker.setId(cryptoBroker.getId());

        partialUpdatedCryptoBroker
            .name(UPDATED_NAME)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .rating(UPDATED_RATING)
            .features(UPDATED_FEATURES)
            .regulation(UPDATED_REGULATION)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .supportedCoins(UPDATED_SUPPORTED_COINS)
            .pros(UPDATED_PROS)
            .securityFeatures(UPDATED_SECURITY_FEATURES)
            .paymentMethods(UPDATED_PAYMENT_METHODS)
            .mobileApp(UPDATED_MOBILE_APP)
            .apiSupport(UPDATED_API_SUPPORT);

        restCryptoBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoBroker))
            )
            .andExpect(status().isOk());

        // Validate the CryptoBroker in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoBrokerUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCryptoBroker, cryptoBroker),
            getPersistedCryptoBroker(cryptoBroker)
        );
    }

    @Test
    void fullUpdateCryptoBrokerWithPatch() throws Exception {
        // Initialize the database
        insertedCryptoBroker = cryptoBrokerRepository.save(cryptoBroker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the cryptoBroker using partial update
        CryptoBroker partialUpdatedCryptoBroker = new CryptoBroker();
        partialUpdatedCryptoBroker.setId(cryptoBroker.getId());

        partialUpdatedCryptoBroker
            .name(UPDATED_NAME)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .features(UPDATED_FEATURES)
            .regulation(UPDATED_REGULATION)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .tradingFees(UPDATED_TRADING_FEES)
            .supportedCoins(UPDATED_SUPPORTED_COINS)
            .pros(UPDATED_PROS)
            .cons(UPDATED_CONS)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS)
            .tradingVolume(UPDATED_TRADING_VOLUME)
            .securityFeatures(UPDATED_SECURITY_FEATURES)
            .paymentMethods(UPDATED_PAYMENT_METHODS)
            .customerSupport(UPDATED_CUSTOMER_SUPPORT)
            .mobileApp(UPDATED_MOBILE_APP)
            .apiSupport(UPDATED_API_SUPPORT)
            .detailedDescription(UPDATED_DETAILED_DESCRIPTION);

        restCryptoBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCryptoBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCryptoBroker))
            )
            .andExpect(status().isOk());

        // Validate the CryptoBroker in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCryptoBrokerUpdatableFieldsEquals(partialUpdatedCryptoBroker, getPersistedCryptoBroker(partialUpdatedCryptoBroker));
    }

    @Test
    void patchNonExistingCryptoBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoBroker.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCryptoBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cryptoBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCryptoBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(cryptoBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCryptoBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        cryptoBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCryptoBrokerMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(cryptoBroker)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CryptoBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCryptoBroker() throws Exception {
        // Initialize the database
        insertedCryptoBroker = cryptoBrokerRepository.save(cryptoBroker);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the cryptoBroker
        restCryptoBrokerMockMvc
            .perform(delete(ENTITY_API_URL_ID, cryptoBroker.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return cryptoBrokerRepository.count();
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

    protected CryptoBroker getPersistedCryptoBroker(CryptoBroker cryptoBroker) {
        return cryptoBrokerRepository.findById(cryptoBroker.getId()).orElseThrow();
    }

    protected void assertPersistedCryptoBrokerToMatchAllProperties(CryptoBroker expectedCryptoBroker) {
        assertCryptoBrokerAllPropertiesEquals(expectedCryptoBroker, getPersistedCryptoBroker(expectedCryptoBroker));
    }

    protected void assertPersistedCryptoBrokerToMatchUpdatableProperties(CryptoBroker expectedCryptoBroker) {
        assertCryptoBrokerAllUpdatablePropertiesEquals(expectedCryptoBroker, getPersistedCryptoBroker(expectedCryptoBroker));
    }
}
