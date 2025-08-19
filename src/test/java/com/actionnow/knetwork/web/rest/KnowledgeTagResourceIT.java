package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.KnowledgeTagAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.KnowledgeTag;
import com.actionnow.knetwork.repository.KnowledgeTagRepository;
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
 * Integration tests for the {@link KnowledgeTagResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class KnowledgeTagResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/knowledge-tags";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private KnowledgeTagRepository knowledgeTagRepository;

    @Autowired
    private MockMvc restKnowledgeTagMockMvc;

    private KnowledgeTag knowledgeTag;

    private KnowledgeTag insertedKnowledgeTag;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KnowledgeTag createEntity() {
        return new KnowledgeTag().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KnowledgeTag createUpdatedEntity() {
        return new KnowledgeTag().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        knowledgeTag = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedKnowledgeTag != null) {
            knowledgeTagRepository.delete(insertedKnowledgeTag);
            insertedKnowledgeTag = null;
        }
    }

    @Test
    void createKnowledgeTag() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the KnowledgeTag
        var returnedKnowledgeTag = om.readValue(
            restKnowledgeTagMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeTag)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            KnowledgeTag.class
        );

        // Validate the KnowledgeTag in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertKnowledgeTagUpdatableFieldsEquals(returnedKnowledgeTag, getPersistedKnowledgeTag(returnedKnowledgeTag));

        insertedKnowledgeTag = returnedKnowledgeTag;
    }

    @Test
    void createKnowledgeTagWithExistingId() throws Exception {
        // Create the KnowledgeTag with an existing ID
        knowledgeTag.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKnowledgeTagMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeTag)))
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        knowledgeTag.setValue(null);

        // Create the KnowledgeTag, which fails.

        restKnowledgeTagMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeTag)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllKnowledgeTags() throws Exception {
        // Initialize the database
        insertedKnowledgeTag = knowledgeTagRepository.save(knowledgeTag);

        // Get all the knowledgeTagList
        restKnowledgeTagMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(knowledgeTag.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getKnowledgeTag() throws Exception {
        // Initialize the database
        insertedKnowledgeTag = knowledgeTagRepository.save(knowledgeTag);

        // Get the knowledgeTag
        restKnowledgeTagMockMvc
            .perform(get(ENTITY_API_URL_ID, knowledgeTag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(knowledgeTag.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingKnowledgeTag() throws Exception {
        // Get the knowledgeTag
        restKnowledgeTagMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingKnowledgeTag() throws Exception {
        // Initialize the database
        insertedKnowledgeTag = knowledgeTagRepository.save(knowledgeTag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the knowledgeTag
        KnowledgeTag updatedKnowledgeTag = knowledgeTagRepository.findById(knowledgeTag.getId()).orElseThrow();
        updatedKnowledgeTag.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restKnowledgeTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKnowledgeTag.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedKnowledgeTag))
            )
            .andExpect(status().isOk());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedKnowledgeTagToMatchAllProperties(updatedKnowledgeTag);
    }

    @Test
    void putNonExistingKnowledgeTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeTag.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKnowledgeTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, knowledgeTag.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(knowledgeTag))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchKnowledgeTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeTag.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeTagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(knowledgeTag))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamKnowledgeTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeTag.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeTagMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeTag)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateKnowledgeTagWithPatch() throws Exception {
        // Initialize the database
        insertedKnowledgeTag = knowledgeTagRepository.save(knowledgeTag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the knowledgeTag using partial update
        KnowledgeTag partialUpdatedKnowledgeTag = new KnowledgeTag();
        partialUpdatedKnowledgeTag.setId(knowledgeTag.getId());

        partialUpdatedKnowledgeTag.value(UPDATED_VALUE);

        restKnowledgeTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKnowledgeTag.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedKnowledgeTag))
            )
            .andExpect(status().isOk());

        // Validate the KnowledgeTag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertKnowledgeTagUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedKnowledgeTag, knowledgeTag),
            getPersistedKnowledgeTag(knowledgeTag)
        );
    }

    @Test
    void fullUpdateKnowledgeTagWithPatch() throws Exception {
        // Initialize the database
        insertedKnowledgeTag = knowledgeTagRepository.save(knowledgeTag);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the knowledgeTag using partial update
        KnowledgeTag partialUpdatedKnowledgeTag = new KnowledgeTag();
        partialUpdatedKnowledgeTag.setId(knowledgeTag.getId());

        partialUpdatedKnowledgeTag.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restKnowledgeTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKnowledgeTag.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedKnowledgeTag))
            )
            .andExpect(status().isOk());

        // Validate the KnowledgeTag in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertKnowledgeTagUpdatableFieldsEquals(partialUpdatedKnowledgeTag, getPersistedKnowledgeTag(partialUpdatedKnowledgeTag));
    }

    @Test
    void patchNonExistingKnowledgeTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeTag.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKnowledgeTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, knowledgeTag.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(knowledgeTag))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchKnowledgeTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeTag.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeTagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(knowledgeTag))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamKnowledgeTag() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeTag.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeTagMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(knowledgeTag)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KnowledgeTag in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteKnowledgeTag() throws Exception {
        // Initialize the database
        insertedKnowledgeTag = knowledgeTagRepository.save(knowledgeTag);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the knowledgeTag
        restKnowledgeTagMockMvc
            .perform(delete(ENTITY_API_URL_ID, knowledgeTag.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return knowledgeTagRepository.count();
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

    protected KnowledgeTag getPersistedKnowledgeTag(KnowledgeTag knowledgeTag) {
        return knowledgeTagRepository.findById(knowledgeTag.getId()).orElseThrow();
    }

    protected void assertPersistedKnowledgeTagToMatchAllProperties(KnowledgeTag expectedKnowledgeTag) {
        assertKnowledgeTagAllPropertiesEquals(expectedKnowledgeTag, getPersistedKnowledgeTag(expectedKnowledgeTag));
    }

    protected void assertPersistedKnowledgeTagToMatchUpdatableProperties(KnowledgeTag expectedKnowledgeTag) {
        assertKnowledgeTagAllUpdatablePropertiesEquals(expectedKnowledgeTag, getPersistedKnowledgeTag(expectedKnowledgeTag));
    }
}
