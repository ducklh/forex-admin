package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.InstrumentAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.Instrument;
import com.actionnow.knetwork.repository.InstrumentRepository;
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
 * Integration tests for the {@link InstrumentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InstrumentResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/instruments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private InstrumentRepository instrumentRepository;

    @Autowired
    private MockMvc restInstrumentMockMvc;

    private Instrument instrument;

    private Instrument insertedInstrument;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instrument createEntity() {
        return new Instrument().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instrument createUpdatedEntity() {
        return new Instrument().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        instrument = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedInstrument != null) {
            instrumentRepository.delete(insertedInstrument);
            insertedInstrument = null;
        }
    }

    @Test
    void createInstrument() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Instrument
        var returnedInstrument = om.readValue(
            restInstrumentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instrument)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Instrument.class
        );

        // Validate the Instrument in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertInstrumentUpdatableFieldsEquals(returnedInstrument, getPersistedInstrument(returnedInstrument));

        insertedInstrument = returnedInstrument;
    }

    @Test
    void createInstrumentWithExistingId() throws Exception {
        // Create the Instrument with an existing ID
        instrument.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstrumentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instrument)))
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        instrument.setValue(null);

        // Create the Instrument, which fails.

        restInstrumentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instrument)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllInstruments() throws Exception {
        // Initialize the database
        insertedInstrument = instrumentRepository.save(instrument);

        // Get all the instrumentList
        restInstrumentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instrument.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getInstrument() throws Exception {
        // Initialize the database
        insertedInstrument = instrumentRepository.save(instrument);

        // Get the instrument
        restInstrumentMockMvc
            .perform(get(ENTITY_API_URL_ID, instrument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(instrument.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingInstrument() throws Exception {
        // Get the instrument
        restInstrumentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingInstrument() throws Exception {
        // Initialize the database
        insertedInstrument = instrumentRepository.save(instrument);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instrument
        Instrument updatedInstrument = instrumentRepository.findById(instrument.getId()).orElseThrow();
        updatedInstrument.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restInstrumentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedInstrument.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedInstrument))
            )
            .andExpect(status().isOk());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedInstrumentToMatchAllProperties(updatedInstrument);
    }

    @Test
    void putNonExistingInstrument() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instrument.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstrumentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, instrument.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instrument))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchInstrument() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instrument.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstrumentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(instrument))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamInstrument() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instrument.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstrumentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instrument)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateInstrumentWithPatch() throws Exception {
        // Initialize the database
        insertedInstrument = instrumentRepository.save(instrument);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instrument using partial update
        Instrument partialUpdatedInstrument = new Instrument();
        partialUpdatedInstrument.setId(instrument.getId());

        partialUpdatedInstrument.value(UPDATED_VALUE);

        restInstrumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInstrument.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInstrument))
            )
            .andExpect(status().isOk());

        // Validate the Instrument in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInstrumentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedInstrument, instrument),
            getPersistedInstrument(instrument)
        );
    }

    @Test
    void fullUpdateInstrumentWithPatch() throws Exception {
        // Initialize the database
        insertedInstrument = instrumentRepository.save(instrument);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instrument using partial update
        Instrument partialUpdatedInstrument = new Instrument();
        partialUpdatedInstrument.setId(instrument.getId());

        partialUpdatedInstrument.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restInstrumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInstrument.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInstrument))
            )
            .andExpect(status().isOk());

        // Validate the Instrument in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInstrumentUpdatableFieldsEquals(partialUpdatedInstrument, getPersistedInstrument(partialUpdatedInstrument));
    }

    @Test
    void patchNonExistingInstrument() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instrument.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstrumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, instrument.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(instrument))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchInstrument() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instrument.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstrumentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(instrument))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamInstrument() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instrument.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstrumentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(instrument)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Instrument in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteInstrument() throws Exception {
        // Initialize the database
        insertedInstrument = instrumentRepository.save(instrument);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the instrument
        restInstrumentMockMvc
            .perform(delete(ENTITY_API_URL_ID, instrument.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return instrumentRepository.count();
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

    protected Instrument getPersistedInstrument(Instrument instrument) {
        return instrumentRepository.findById(instrument.getId()).orElseThrow();
    }

    protected void assertPersistedInstrumentToMatchAllProperties(Instrument expectedInstrument) {
        assertInstrumentAllPropertiesEquals(expectedInstrument, getPersistedInstrument(expectedInstrument));
    }

    protected void assertPersistedInstrumentToMatchUpdatableProperties(Instrument expectedInstrument) {
        assertInstrumentAllUpdatablePropertiesEquals(expectedInstrument, getPersistedInstrument(expectedInstrument));
    }
}
