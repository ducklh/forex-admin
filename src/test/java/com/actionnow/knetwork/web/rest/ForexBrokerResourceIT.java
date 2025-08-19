package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.ForexBrokerAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static com.actionnow.knetwork.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.ForexBroker;
import com.actionnow.knetwork.repository.ForexBrokerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link ForexBrokerResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ForexBrokerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME_EN = "AAAAAAAAAA";
    private static final String UPDATED_NAME_EN = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_LOGO = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_EN = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_EN = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_RATING = new BigDecimal(1);
    private static final BigDecimal UPDATED_RATING = new BigDecimal(2);

    private static final String DEFAULT_REGULATION = "AAAAAAAAAA";
    private static final String UPDATED_REGULATION = "BBBBBBBBBB";

    private static final String DEFAULT_MIN_DEPOSIT = "AAAAAAAAAA";
    private static final String UPDATED_MIN_DEPOSIT = "BBBBBBBBBB";

    private static final String DEFAULT_SPREADS = "AAAAAAAAAA";
    private static final String UPDATED_SPREADS = "BBBBBBBBBB";

    private static final String DEFAULT_LEVERAGE = "AAAAAAAAAA";
    private static final String UPDATED_LEVERAGE = "BBBBBBBBBB";

    private static final String DEFAULT_FOUNDED = "AAAAAAAAAA";
    private static final String UPDATED_FOUNDED = "BBBBBBBBBB";

    private static final String DEFAULT_HEADQUARTERS = "AAAAAAAAAA";
    private static final String UPDATED_HEADQUARTERS = "BBBBBBBBBB";

    private static final String DEFAULT_HEADQUARTERS_EN = "AAAAAAAAAA";
    private static final String UPDATED_HEADQUARTERS_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/forex-brokers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ForexBrokerRepository forexBrokerRepository;

    @Mock
    private ForexBrokerRepository forexBrokerRepositoryMock;

    @Autowired
    private MockMvc restForexBrokerMockMvc;

    private ForexBroker forexBroker;

    private ForexBroker insertedForexBroker;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ForexBroker createEntity() {
        return new ForexBroker()
            .name(DEFAULT_NAME)
            .nameEn(DEFAULT_NAME_EN)
            .logo(DEFAULT_LOGO)
            .url(DEFAULT_URL)
            .description(DEFAULT_DESCRIPTION)
            .descriptionEn(DEFAULT_DESCRIPTION_EN)
            .rating(DEFAULT_RATING)
            .regulation(DEFAULT_REGULATION)
            .minDeposit(DEFAULT_MIN_DEPOSIT)
            .spreads(DEFAULT_SPREADS)
            .leverage(DEFAULT_LEVERAGE)
            .founded(DEFAULT_FOUNDED)
            .headquarters(DEFAULT_HEADQUARTERS)
            .headquartersEn(DEFAULT_HEADQUARTERS_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ForexBroker createUpdatedEntity() {
        return new ForexBroker()
            .name(UPDATED_NAME)
            .nameEn(UPDATED_NAME_EN)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .descriptionEn(UPDATED_DESCRIPTION_EN)
            .rating(UPDATED_RATING)
            .regulation(UPDATED_REGULATION)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .spreads(UPDATED_SPREADS)
            .leverage(UPDATED_LEVERAGE)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS)
            .headquartersEn(UPDATED_HEADQUARTERS_EN);
    }

    @BeforeEach
    public void initTest() {
        forexBroker = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedForexBroker != null) {
            forexBrokerRepository.delete(insertedForexBroker);
            insertedForexBroker = null;
        }
    }

    @Test
    void createForexBroker() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ForexBroker
        var returnedForexBroker = om.readValue(
            restForexBrokerMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(forexBroker)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ForexBroker.class
        );

        // Validate the ForexBroker in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertForexBrokerUpdatableFieldsEquals(returnedForexBroker, getPersistedForexBroker(returnedForexBroker));

        insertedForexBroker = returnedForexBroker;
    }

    @Test
    void createForexBrokerWithExistingId() throws Exception {
        // Create the ForexBroker with an existing ID
        forexBroker.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restForexBrokerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(forexBroker)))
            .andExpect(status().isBadRequest());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        forexBroker.setName(null);

        // Create the ForexBroker, which fails.

        restForexBrokerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(forexBroker)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllForexBrokers() throws Exception {
        // Initialize the database
        insertedForexBroker = forexBrokerRepository.save(forexBroker);

        // Get all the forexBrokerList
        restForexBrokerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(forexBroker.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].nameEn").value(hasItem(DEFAULT_NAME_EN)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].descriptionEn").value(hasItem(DEFAULT_DESCRIPTION_EN)))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(sameNumber(DEFAULT_RATING))))
            .andExpect(jsonPath("$.[*].regulation").value(hasItem(DEFAULT_REGULATION)))
            .andExpect(jsonPath("$.[*].minDeposit").value(hasItem(DEFAULT_MIN_DEPOSIT)))
            .andExpect(jsonPath("$.[*].spreads").value(hasItem(DEFAULT_SPREADS)))
            .andExpect(jsonPath("$.[*].leverage").value(hasItem(DEFAULT_LEVERAGE)))
            .andExpect(jsonPath("$.[*].founded").value(hasItem(DEFAULT_FOUNDED)))
            .andExpect(jsonPath("$.[*].headquarters").value(hasItem(DEFAULT_HEADQUARTERS)))
            .andExpect(jsonPath("$.[*].headquartersEn").value(hasItem(DEFAULT_HEADQUARTERS_EN)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllForexBrokersWithEagerRelationshipsIsEnabled() throws Exception {
        when(forexBrokerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restForexBrokerMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(forexBrokerRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllForexBrokersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(forexBrokerRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restForexBrokerMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(forexBrokerRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getForexBroker() throws Exception {
        // Initialize the database
        insertedForexBroker = forexBrokerRepository.save(forexBroker);

        // Get the forexBroker
        restForexBrokerMockMvc
            .perform(get(ENTITY_API_URL_ID, forexBroker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(forexBroker.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.nameEn").value(DEFAULT_NAME_EN))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.descriptionEn").value(DEFAULT_DESCRIPTION_EN))
            .andExpect(jsonPath("$.rating").value(sameNumber(DEFAULT_RATING)))
            .andExpect(jsonPath("$.regulation").value(DEFAULT_REGULATION))
            .andExpect(jsonPath("$.minDeposit").value(DEFAULT_MIN_DEPOSIT))
            .andExpect(jsonPath("$.spreads").value(DEFAULT_SPREADS))
            .andExpect(jsonPath("$.leverage").value(DEFAULT_LEVERAGE))
            .andExpect(jsonPath("$.founded").value(DEFAULT_FOUNDED))
            .andExpect(jsonPath("$.headquarters").value(DEFAULT_HEADQUARTERS))
            .andExpect(jsonPath("$.headquartersEn").value(DEFAULT_HEADQUARTERS_EN));
    }

    @Test
    void getNonExistingForexBroker() throws Exception {
        // Get the forexBroker
        restForexBrokerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingForexBroker() throws Exception {
        // Initialize the database
        insertedForexBroker = forexBrokerRepository.save(forexBroker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the forexBroker
        ForexBroker updatedForexBroker = forexBrokerRepository.findById(forexBroker.getId()).orElseThrow();
        updatedForexBroker
            .name(UPDATED_NAME)
            .nameEn(UPDATED_NAME_EN)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .descriptionEn(UPDATED_DESCRIPTION_EN)
            .rating(UPDATED_RATING)
            .regulation(UPDATED_REGULATION)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .spreads(UPDATED_SPREADS)
            .leverage(UPDATED_LEVERAGE)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS)
            .headquartersEn(UPDATED_HEADQUARTERS_EN);

        restForexBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedForexBroker.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedForexBroker))
            )
            .andExpect(status().isOk());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedForexBrokerToMatchAllProperties(updatedForexBroker);
    }

    @Test
    void putNonExistingForexBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        forexBroker.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restForexBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, forexBroker.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(forexBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchForexBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        forexBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restForexBrokerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(forexBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamForexBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        forexBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restForexBrokerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(forexBroker)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateForexBrokerWithPatch() throws Exception {
        // Initialize the database
        insertedForexBroker = forexBrokerRepository.save(forexBroker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the forexBroker using partial update
        ForexBroker partialUpdatedForexBroker = new ForexBroker();
        partialUpdatedForexBroker.setId(forexBroker.getId());

        partialUpdatedForexBroker
            .url(UPDATED_URL)
            .descriptionEn(UPDATED_DESCRIPTION_EN)
            .spreads(UPDATED_SPREADS)
            .headquarters(UPDATED_HEADQUARTERS);

        restForexBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedForexBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedForexBroker))
            )
            .andExpect(status().isOk());

        // Validate the ForexBroker in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertForexBrokerUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedForexBroker, forexBroker),
            getPersistedForexBroker(forexBroker)
        );
    }

    @Test
    void fullUpdateForexBrokerWithPatch() throws Exception {
        // Initialize the database
        insertedForexBroker = forexBrokerRepository.save(forexBroker);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the forexBroker using partial update
        ForexBroker partialUpdatedForexBroker = new ForexBroker();
        partialUpdatedForexBroker.setId(forexBroker.getId());

        partialUpdatedForexBroker
            .name(UPDATED_NAME)
            .nameEn(UPDATED_NAME_EN)
            .logo(UPDATED_LOGO)
            .url(UPDATED_URL)
            .description(UPDATED_DESCRIPTION)
            .descriptionEn(UPDATED_DESCRIPTION_EN)
            .rating(UPDATED_RATING)
            .regulation(UPDATED_REGULATION)
            .minDeposit(UPDATED_MIN_DEPOSIT)
            .spreads(UPDATED_SPREADS)
            .leverage(UPDATED_LEVERAGE)
            .founded(UPDATED_FOUNDED)
            .headquarters(UPDATED_HEADQUARTERS)
            .headquartersEn(UPDATED_HEADQUARTERS_EN);

        restForexBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedForexBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedForexBroker))
            )
            .andExpect(status().isOk());

        // Validate the ForexBroker in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertForexBrokerUpdatableFieldsEquals(partialUpdatedForexBroker, getPersistedForexBroker(partialUpdatedForexBroker));
    }

    @Test
    void patchNonExistingForexBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        forexBroker.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restForexBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, forexBroker.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(forexBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchForexBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        forexBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restForexBrokerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(forexBroker))
            )
            .andExpect(status().isBadRequest());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamForexBroker() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        forexBroker.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restForexBrokerMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(forexBroker)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ForexBroker in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteForexBroker() throws Exception {
        // Initialize the database
        insertedForexBroker = forexBrokerRepository.save(forexBroker);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the forexBroker
        restForexBrokerMockMvc
            .perform(delete(ENTITY_API_URL_ID, forexBroker.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return forexBrokerRepository.count();
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

    protected ForexBroker getPersistedForexBroker(ForexBroker forexBroker) {
        return forexBrokerRepository.findById(forexBroker.getId()).orElseThrow();
    }

    protected void assertPersistedForexBrokerToMatchAllProperties(ForexBroker expectedForexBroker) {
        assertForexBrokerAllPropertiesEquals(expectedForexBroker, getPersistedForexBroker(expectedForexBroker));
    }

    protected void assertPersistedForexBrokerToMatchUpdatableProperties(ForexBroker expectedForexBroker) {
        assertForexBrokerAllUpdatablePropertiesEquals(expectedForexBroker, getPersistedForexBroker(expectedForexBroker));
    }
}
