package com.knetwork.forex.web.rest;

import static com.knetwork.forex.domain.PlatformAsserts.*;
import static com.knetwork.forex.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.knetwork.forex.IntegrationTest;
import com.knetwork.forex.domain.Platform;
import com.knetwork.forex.repository.PlatformRepository;
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
 * Integration tests for the {@link PlatformResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlatformResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/platforms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PlatformRepository platformRepository;

    @Autowired
    private MockMvc restPlatformMockMvc;

    private Platform platform;

    private Platform insertedPlatform;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Platform createEntity() {
        return new Platform().name(DEFAULT_NAME);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Platform createUpdatedEntity() {
        return new Platform().name(UPDATED_NAME);
    }

    @BeforeEach
    public void initTest() {
        platform = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedPlatform != null) {
            platformRepository.delete(insertedPlatform);
            insertedPlatform = null;
        }
    }

    @Test
    void createPlatform() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Platform
        var returnedPlatform = om.readValue(
            restPlatformMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(platform)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Platform.class
        );

        // Validate the Platform in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertPlatformUpdatableFieldsEquals(returnedPlatform, getPersistedPlatform(returnedPlatform));

        insertedPlatform = returnedPlatform;
    }

    @Test
    void createPlatformWithExistingId() throws Exception {
        // Create the Platform with an existing ID
        platform.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlatformMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(platform)))
            .andExpect(status().isBadRequest());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        platform.setName(null);

        // Create the Platform, which fails.

        restPlatformMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(platform)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllPlatforms() throws Exception {
        // Initialize the database
        insertedPlatform = platformRepository.save(platform);

        // Get all the platformList
        restPlatformMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(platform.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    void getPlatform() throws Exception {
        // Initialize the database
        insertedPlatform = platformRepository.save(platform);

        // Get the platform
        restPlatformMockMvc
            .perform(get(ENTITY_API_URL_ID, platform.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(platform.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    void getNonExistingPlatform() throws Exception {
        // Get the platform
        restPlatformMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingPlatform() throws Exception {
        // Initialize the database
        insertedPlatform = platformRepository.save(platform);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the platform
        Platform updatedPlatform = platformRepository.findById(platform.getId()).orElseThrow();
        updatedPlatform.name(UPDATED_NAME);

        restPlatformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPlatform.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedPlatform))
            )
            .andExpect(status().isOk());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedPlatformToMatchAllProperties(updatedPlatform);
    }

    @Test
    void putNonExistingPlatform() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        platform.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlatformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, platform.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(platform))
            )
            .andExpect(status().isBadRequest());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPlatform() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        platform.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatformMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(platform))
            )
            .andExpect(status().isBadRequest());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPlatform() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        platform.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatformMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(platform)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePlatformWithPatch() throws Exception {
        // Initialize the database
        insertedPlatform = platformRepository.save(platform);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the platform using partial update
        Platform partialUpdatedPlatform = new Platform();
        partialUpdatedPlatform.setId(platform.getId());

        partialUpdatedPlatform.name(UPDATED_NAME);

        restPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlatform.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPlatform))
            )
            .andExpect(status().isOk());

        // Validate the Platform in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPlatformUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedPlatform, platform), getPersistedPlatform(platform));
    }

    @Test
    void fullUpdatePlatformWithPatch() throws Exception {
        // Initialize the database
        insertedPlatform = platformRepository.save(platform);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the platform using partial update
        Platform partialUpdatedPlatform = new Platform();
        partialUpdatedPlatform.setId(platform.getId());

        partialUpdatedPlatform.name(UPDATED_NAME);

        restPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlatform.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPlatform))
            )
            .andExpect(status().isOk());

        // Validate the Platform in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPlatformUpdatableFieldsEquals(partialUpdatedPlatform, getPersistedPlatform(partialUpdatedPlatform));
    }

    @Test
    void patchNonExistingPlatform() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        platform.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, platform.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(platform))
            )
            .andExpect(status().isBadRequest());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPlatform() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        platform.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatformMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(platform))
            )
            .andExpect(status().isBadRequest());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPlatform() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        platform.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlatformMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(platform)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Platform in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePlatform() throws Exception {
        // Initialize the database
        insertedPlatform = platformRepository.save(platform);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the platform
        restPlatformMockMvc
            .perform(delete(ENTITY_API_URL_ID, platform.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return platformRepository.count();
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

    protected Platform getPersistedPlatform(Platform platform) {
        return platformRepository.findById(platform.getId()).orElseThrow();
    }

    protected void assertPersistedPlatformToMatchAllProperties(Platform expectedPlatform) {
        assertPlatformAllPropertiesEquals(expectedPlatform, getPersistedPlatform(expectedPlatform));
    }

    protected void assertPersistedPlatformToMatchUpdatableProperties(Platform expectedPlatform) {
        assertPlatformAllUpdatablePropertiesEquals(expectedPlatform, getPersistedPlatform(expectedPlatform));
    }
}
