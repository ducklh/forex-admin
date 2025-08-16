package com.knetwork.forex.web.rest;

import static com.knetwork.forex.domain.BrokerAsserts.*;
import static com.knetwork.forex.web.rest.TestUtil.createUpdateProxyForBean;
import static com.knetwork.forex.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knetwork.forex.IntegrationTest;
import com.knetwork.forex.domain.Broker;
import com.knetwork.forex.repository.BrokerRepository;
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
 * Integration tests for the {@link BrokerResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BrokerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_LOGO = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_RATING = 1D;
    private static final Double UPDATED_RATING = 2D;

    private static final BigDecimal DEFAULT_MIN_DEPOSIT = new BigDecimal(1);
    private static final BigDecimal UPDATED_MIN_DEPOSIT = new BigDecimal(2);

    private static final String DEFAULT_SPREADS = "AAAAAAAAAA";
    private static final String UPDATED_SPREADS = "BBBBBBBBBB";

    private static final String DEFAULT_LEVERAGE = "AAAAAAAAAA";
    private static final String UPDATED_LEVERAGE = "BBBBBBBBBB";

    private static final Integer DEFAULT_FOUNDED = 1;
    private static final Integer UPDATED_FOUNDED = 2;

    private static final String DEFAULT_HEADQUARTERS = "AAAAAAAAAA";
    private static final String UPDATED_HEADQUARTERS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/brokers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BrokerRepository brokerRepository;

    @Autowired
    private MockMvc restBrokerMockMvc;

    private Broker broker;

    private Broker insertedBroker;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Broker createEntity() {
        return new Broker()
            .name(DEFAULT_NAME)
            .logo(DEFAULT_LOGO)
            .url(DEFAULT_URL)
            .description(DEFAULT_DESCRIPTION)
            .rating(DEFAULT_RATING)
            .minDeposit(DEFAULT_MIN_DEPOSIT)
            .spreads(DEFAULT_SPREADS)
            .leverage(DEFAULT_LEVERAGE)
            .founded(DEFAULT_FOUNDED)
            .headquarters(DEFAULT_HEADQUARTERS);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Broker createUpdatedEntity() {
        return new Broker()
            .name(UPDATED_NAME)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .spreads(UPDATED_SPREADS)
            .leverage(UPDATED_LEVERAGE)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS);
    }

    @BeforeEach
    public void initTest() {
        broker = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedBroker != null) {
            brokerRepository.delete(insertedBroker);
            insertedBroker = null;
        }
    }

    @Test
    void createBroker() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Broker
        var returnedBroker = om.readValue(
            restBrokerMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(broker)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Broker.class
        );

        // Validate the Broker in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertBrokerUpdatableFieldsEquals(returnedBroker, getPersistedBroker(returnedBroker));

        insertedBroker = returnedBroker;
    }

    @Test
    void createBrokerWithExistingId() throws Exception {
        // Create the Broker with an existing ID
        broker.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBrokerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(broker)))
            .andExpect(status().isBadRequest());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        broker.setName(null);

        // Create the Broker, which fails.

        restBrokerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(broker)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllBrokers() throws Exception {
        // Initialize the database
        insertedBroker = brokerRepository.save(broker);

        // Get all the brokerList
        restBrokerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(broker.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].minDeposit").value(hasItem(sameNumber(DEFAULT_MIN_DEPOSIT))))
            .andExpect(jsonPath("$.[*].spreads").value(hasItem(DEFAULT_SPREADS)))
            .andExpect(jsonPath("$.[*].leverage").value(hasItem(DEFAULT_LEVERAGE)))
            .andExpect(jsonPath("$.[*].founded").value(hasItem(DEFAULT_FOUNDED)))
            .andExpect(jsonPath("$.[*].headquarters").value(hasItem(DEFAULT_HEADQUARTERS)));
    }

    @Test
    void getBroker() throws Exception {
        // Initialize the database
        insertedBroker = brokerRepository.save(broker);

        // Get the broker
        restBrokerMockMvc
            .perform(get(ENTITY_API_URL_ID, broker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(broker.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING))
            .andExpect(jsonPath("$.minDeposit").value(sameNumber(DEFAULT_MIN_DEPOSIT)))
            .andExpect(jsonPath("$.spreads").value(DEFAULT_SPREADS))
            .andExpect(jsonPath("$.leverage").value(DEFAULT_LEVERAGE))
            .andExpect(jsonPath("$.founded").value(DEFAULT_FOUNDED))
            .andExpect(jsonPath("$.headquarters").value(DEFAULT_HEADQUARTERS));
    }

    @Test
    void getNonExistingBroker() throws Exception {
        // Get the broker
        restBrokerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingBroker() throws Exception {
        // Initialize the database
        insertedBroker = brokerRepository.save(broker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the broker
        Broker updatedBroker = brokerRepository.findById(broker.getId()).orElseThrow();
        updatedBroker
            .name(UPDATED_NAME)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .spreads(UPDATED_SPREADS)
            .leverage(UPDATED_LEVERAGE)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS);

        restBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedBroker.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedBroker))
            )
            .andExpect(status().isOk());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBrokerToMatchAllProperties(updatedBroker);
    }

    @Test
    void putNonExistingBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        broker.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBrokerMockMvc
            .perform(put(ENTITY_API_URL_ID, broker.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(broker)))
            .andExpect(status().isBadRequest());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        broker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(broker))
            )
            .andExpect(status().isBadRequest());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        broker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBrokerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(broker)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateBrokerWithPatch() throws Exception {
        // Initialize the database
        insertedBroker = brokerRepository.save(broker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the broker using partial update
        Broker partialUpdatedBroker = new Broker();
        partialUpdatedBroker.setId(broker.getId());

        partialUpdatedBroker
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .rating(UPDATED_RATING)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .spreads(UPDATED_SPREADS)
            .headquarters(UPDATED_HEADQUARTERS);

        restBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBroker))
            )
            .andExpect(status().isOk());

        // Validate the Broker in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBrokerUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedBroker, broker), getPersistedBroker(broker));
    }

    @Test
    void fullUpdateBrokerWithPatch() throws Exception {
        // Initialize the database
        insertedBroker = brokerRepository.save(broker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the broker using partial update
        Broker partialUpdatedBroker = new Broker();
        partialUpdatedBroker.setId(broker.getId());

        partialUpdatedBroker
            .name(UPDATED_NAME)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .rating(UPDATED_RATING)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .spreads(UPDATED_SPREADS)
            .leverage(UPDATED_LEVERAGE)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS);

        restBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBroker))
            )
            .andExpect(status().isOk());

        // Validate the Broker in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBrokerUpdatableFieldsEquals(partialUpdatedBroker, getPersistedBroker(partialUpdatedBroker));
    }

    @Test
    void patchNonExistingBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        broker.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, broker.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(broker))
            )
            .andExpect(status().isBadRequest());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        broker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(broker))
            )
            .andExpect(status().isBadRequest());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        broker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBrokerMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(broker)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Broker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteBroker() throws Exception {
        // Initialize the database
        insertedBroker = brokerRepository.save(broker);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the broker
        restBrokerMockMvc
            .perform(delete(ENTITY_API_URL_ID, broker.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return brokerRepository.count();
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

    protected Broker getPersistedBroker(Broker broker) {
        return brokerRepository.findById(broker.getId()).orElseThrow();
    }

    protected void assertPersistedBrokerToMatchAllProperties(Broker expectedBroker) {
        assertBrokerAllPropertiesEquals(expectedBroker, getPersistedBroker(expectedBroker));
    }

    protected void assertPersistedBrokerToMatchUpdatableProperties(Broker expectedBroker) {
        assertBrokerAllUpdatablePropertiesEquals(expectedBroker, getPersistedBroker(expectedBroker));
    }
}
