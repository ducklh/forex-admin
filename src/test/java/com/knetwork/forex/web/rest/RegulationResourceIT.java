package com.knetwork.forex.web.rest;

import static com.knetwork.forex.domain.RegulationAsserts.*;
import static com.knetwork.forex.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knetwork.forex.IntegrationTest;
import com.knetwork.forex.domain.Regulation;
import com.knetwork.forex.repository.RegulationRepository;
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
 * Integration tests for the {@link RegulationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RegulationResourceIT {

    private static final String DEFAULT_AUTHORITY = "AAAAAAAAAA";
    private static final String UPDATED_AUTHORITY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/regulations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private RegulationRepository regulationRepository;

    @Autowired
    private MockMvc restRegulationMockMvc;

    private Regulation regulation;

    private Regulation insertedRegulation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Regulation createEntity() {
        return new Regulation().authority(DEFAULT_AUTHORITY);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Regulation createUpdatedEntity() {
        return new Regulation().authority(UPDATED_AUTHORITY);
    }

    @BeforeEach
    public void initTest() {
        regulation = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedRegulation != null) {
            regulationRepository.delete(insertedRegulation);
            insertedRegulation = null;
        }
    }

    @Test
    void createRegulation() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Regulation
        var returnedRegulation = om.readValue(
            restRegulationMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(regulation)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Regulation.class
        );

        // Validate the Regulation in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertRegulationUpdatableFieldsEquals(returnedRegulation, getPersistedRegulation(returnedRegulation));

        insertedRegulation = returnedRegulation;
    }

    @Test
    void createRegulationWithExistingId() throws Exception {
        // Create the Regulation with an existing ID
        regulation.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegulationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(regulation)))
            .andExpect(status().isBadRequest());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkAuthorityIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        regulation.setAuthority(null);

        // Create the Regulation, which fails.

        restRegulationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(regulation)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllRegulations() throws Exception {
        // Initialize the database
        insertedRegulation = regulationRepository.save(regulation);

        // Get all the regulationList
        restRegulationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(regulation.getId())))
            .andExpect(jsonPath("$.[*].authority").value(hasItem(DEFAULT_AUTHORITY)));
    }

    @Test
    void getRegulation() throws Exception {
        // Initialize the database
        insertedRegulation = regulationRepository.save(regulation);

        // Get the regulation
        restRegulationMockMvc
            .perform(get(ENTITY_API_URL_ID, regulation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(regulation.getId()))
            .andExpect(jsonPath("$.authority").value(DEFAULT_AUTHORITY));
    }

    @Test
    void getNonExistingRegulation() throws Exception {
        // Get the regulation
        restRegulationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingRegulation() throws Exception {
        // Initialize the database
        insertedRegulation = regulationRepository.save(regulation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the regulation
        Regulation updatedRegulation = regulationRepository.findById(regulation.getId()).orElseThrow();
        updatedRegulation.authority(UPDATED_AUTHORITY);

        restRegulationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRegulation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedRegulation))
            )
            .andExpect(status().isOk());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedRegulationToMatchAllProperties(updatedRegulation);
    }

    @Test
    void putNonExistingRegulation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        regulation.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegulationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, regulation.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(regulation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchRegulation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        regulation.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegulationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(regulation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamRegulation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        regulation.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegulationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(regulation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateRegulationWithPatch() throws Exception {
        // Initialize the database
        insertedRegulation = regulationRepository.save(regulation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the regulation using partial update
        Regulation partialUpdatedRegulation = new Regulation();
        partialUpdatedRegulation.setId(regulation.getId());

        partialUpdatedRegulation.authority(UPDATED_AUTHORITY);

        restRegulationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRegulation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedRegulation))
            )
            .andExpect(status().isOk());

        // Validate the Regulation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertRegulationUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedRegulation, regulation),
            getPersistedRegulation(regulation)
        );
    }

    @Test
    void fullUpdateRegulationWithPatch() throws Exception {
        // Initialize the database
        insertedRegulation = regulationRepository.save(regulation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the regulation using partial update
        Regulation partialUpdatedRegulation = new Regulation();
        partialUpdatedRegulation.setId(regulation.getId());

        partialUpdatedRegulation.authority(UPDATED_AUTHORITY);

        restRegulationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRegulation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedRegulation))
            )
            .andExpect(status().isOk());

        // Validate the Regulation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertRegulationUpdatableFieldsEquals(partialUpdatedRegulation, getPersistedRegulation(partialUpdatedRegulation));
    }

    @Test
    void patchNonExistingRegulation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        regulation.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegulationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, regulation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(regulation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchRegulation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        regulation.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegulationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(regulation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamRegulation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        regulation.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegulationMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(regulation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Regulation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteRegulation() throws Exception {
        // Initialize the database
        insertedRegulation = regulationRepository.save(regulation);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the regulation
        restRegulationMockMvc
            .perform(delete(ENTITY_API_URL_ID, regulation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return regulationRepository.count();
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

    protected Regulation getPersistedRegulation(Regulation regulation) {
        return regulationRepository.findById(regulation.getId()).orElseThrow();
    }

    protected void assertPersistedRegulationToMatchAllProperties(Regulation expectedRegulation) {
        assertRegulationAllPropertiesEquals(expectedRegulation, getPersistedRegulation(expectedRegulation));
    }

    protected void assertPersistedRegulationToMatchUpdatableProperties(Regulation expectedRegulation) {
        assertRegulationAllUpdatablePropertiesEquals(expectedRegulation, getPersistedRegulation(expectedRegulation));
    }
}
