package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.KnowledgeItemAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.KnowledgeItem;
import com.actionnow.knetwork.repository.KnowledgeItemRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link KnowledgeItemResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class KnowledgeItemResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE_EN = "AAAAAAAAAA";
    private static final String UPDATED_TITLE_EN = "BBBBBBBBBB";

    private static final String DEFAULT_EXCERPT = "AAAAAAAAAA";
    private static final String UPDATED_EXCERPT = "BBBBBBBBBB";

    private static final String DEFAULT_EXCERPT_EN = "AAAAAAAAAA";
    private static final String UPDATED_EXCERPT_EN = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_EN = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_EN = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY_EN = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_EN = "BBBBBBBBBB";

    private static final String DEFAULT_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL = "BBBBBBBBBB";

    private static final String DEFAULT_LEVEL_EN = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_EN = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final Instant DEFAULT_PUBLISHED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PUBLISHED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_READ_TIME = 1;
    private static final Integer UPDATED_READ_TIME = 2;

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/knowledge-items";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private KnowledgeItemRepository knowledgeItemRepository;

    @Mock
    private KnowledgeItemRepository knowledgeItemRepositoryMock;

    @Autowired
    private MockMvc restKnowledgeItemMockMvc;

    private KnowledgeItem knowledgeItem;

    private KnowledgeItem insertedKnowledgeItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KnowledgeItem createEntity() {
        return new KnowledgeItem()
            .title(DEFAULT_TITLE)
            .titleEn(DEFAULT_TITLE_EN)
            .excerpt(DEFAULT_EXCERPT)
            .excerptEn(DEFAULT_EXCERPT_EN)
            .content(DEFAULT_CONTENT)
            .contentEn(DEFAULT_CONTENT_EN)
            .category(DEFAULT_CATEGORY)
            .categoryEn(DEFAULT_CATEGORY_EN)
            .level(DEFAULT_LEVEL)
            .levelEn(DEFAULT_LEVEL_EN)
            .author(DEFAULT_AUTHOR)
            .publishedAt(DEFAULT_PUBLISHED_AT)
            .readTime(DEFAULT_READ_TIME)
            .image(DEFAULT_IMAGE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KnowledgeItem createUpdatedEntity() {
        return new KnowledgeItem()
            .title(UPDATED_TITLE)
            .titleEn(UPDATED_TITLE_EN)
            .excerpt(UPDATED_EXCERPT)
            .excerptEn(UPDATED_EXCERPT_EN)
            .content(UPDATED_CONTENT)
            .contentEn(UPDATED_CONTENT_EN)
            .category(UPDATED_CATEGORY)
            .categoryEn(UPDATED_CATEGORY_EN)
            .level(UPDATED_LEVEL)
            .levelEn(UPDATED_LEVEL_EN)
            .author(UPDATED_AUTHOR)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .readTime(UPDATED_READ_TIME)
            .image(UPDATED_IMAGE);
    }

    @BeforeEach
    public void initTest() {
        knowledgeItem = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedKnowledgeItem != null) {
            knowledgeItemRepository.delete(insertedKnowledgeItem);
            insertedKnowledgeItem = null;
        }
    }

    @Test
    void createKnowledgeItem() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the KnowledgeItem
        var returnedKnowledgeItem = om.readValue(
            restKnowledgeItemMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeItem)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            KnowledgeItem.class
        );

        // Validate the KnowledgeItem in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertKnowledgeItemUpdatableFieldsEquals(returnedKnowledgeItem, getPersistedKnowledgeItem(returnedKnowledgeItem));

        insertedKnowledgeItem = returnedKnowledgeItem;
    }

    @Test
    void createKnowledgeItemWithExistingId() throws Exception {
        // Create the KnowledgeItem with an existing ID
        knowledgeItem.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restKnowledgeItemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeItem)))
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkTitleIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        knowledgeItem.setTitle(null);

        // Create the KnowledgeItem, which fails.

        restKnowledgeItemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeItem)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllKnowledgeItems() throws Exception {
        // Initialize the database
        insertedKnowledgeItem = knowledgeItemRepository.save(knowledgeItem);

        // Get all the knowledgeItemList
        restKnowledgeItemMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(knowledgeItem.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].titleEn").value(hasItem(DEFAULT_TITLE_EN)))
            .andExpect(jsonPath("$.[*].excerpt").value(hasItem(DEFAULT_EXCERPT)))
            .andExpect(jsonPath("$.[*].excerptEn").value(hasItem(DEFAULT_EXCERPT_EN)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].contentEn").value(hasItem(DEFAULT_CONTENT_EN)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].categoryEn").value(hasItem(DEFAULT_CATEGORY_EN)))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)))
            .andExpect(jsonPath("$.[*].levelEn").value(hasItem(DEFAULT_LEVEL_EN)))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].publishedAt").value(hasItem(DEFAULT_PUBLISHED_AT.toString())))
            .andExpect(jsonPath("$.[*].readTime").value(hasItem(DEFAULT_READ_TIME)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllKnowledgeItemsWithEagerRelationshipsIsEnabled() throws Exception {
        when(knowledgeItemRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restKnowledgeItemMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(knowledgeItemRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllKnowledgeItemsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(knowledgeItemRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restKnowledgeItemMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(knowledgeItemRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getKnowledgeItem() throws Exception {
        // Initialize the database
        insertedKnowledgeItem = knowledgeItemRepository.save(knowledgeItem);

        // Get the knowledgeItem
        restKnowledgeItemMockMvc
            .perform(get(ENTITY_API_URL_ID, knowledgeItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(knowledgeItem.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.titleEn").value(DEFAULT_TITLE_EN))
            .andExpect(jsonPath("$.excerpt").value(DEFAULT_EXCERPT))
            .andExpect(jsonPath("$.excerptEn").value(DEFAULT_EXCERPT_EN))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.contentEn").value(DEFAULT_CONTENT_EN))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY))
            .andExpect(jsonPath("$.categoryEn").value(DEFAULT_CATEGORY_EN))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL))
            .andExpect(jsonPath("$.levelEn").value(DEFAULT_LEVEL_EN))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR))
            .andExpect(jsonPath("$.publishedAt").value(DEFAULT_PUBLISHED_AT.toString()))
            .andExpect(jsonPath("$.readTime").value(DEFAULT_READ_TIME))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE));
    }

    @Test
    void getNonExistingKnowledgeItem() throws Exception {
        // Get the knowledgeItem
        restKnowledgeItemMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingKnowledgeItem() throws Exception {
        // Initialize the database
        insertedKnowledgeItem = knowledgeItemRepository.save(knowledgeItem);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the knowledgeItem
        KnowledgeItem updatedKnowledgeItem = knowledgeItemRepository.findById(knowledgeItem.getId()).orElseThrow();
        updatedKnowledgeItem
            .title(UPDATED_TITLE)
            .titleEn(UPDATED_TITLE_EN)
            .excerpt(UPDATED_EXCERPT)
            .excerptEn(UPDATED_EXCERPT_EN)
            .content(UPDATED_CONTENT)
            .contentEn(UPDATED_CONTENT_EN)
            .category(UPDATED_CATEGORY)
            .categoryEn(UPDATED_CATEGORY_EN)
            .level(UPDATED_LEVEL)
            .levelEn(UPDATED_LEVEL_EN)
            .author(UPDATED_AUTHOR)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .readTime(UPDATED_READ_TIME)
            .image(UPDATED_IMAGE);

        restKnowledgeItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedKnowledgeItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedKnowledgeItem))
            )
            .andExpect(status().isOk());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedKnowledgeItemToMatchAllProperties(updatedKnowledgeItem);
    }

    @Test
    void putNonExistingKnowledgeItem() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeItem.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKnowledgeItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, knowledgeItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(knowledgeItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchKnowledgeItem() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeItem.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(knowledgeItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamKnowledgeItem() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeItem.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeItemMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(knowledgeItem)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateKnowledgeItemWithPatch() throws Exception {
        // Initialize the database
        insertedKnowledgeItem = knowledgeItemRepository.save(knowledgeItem);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the knowledgeItem using partial update
        KnowledgeItem partialUpdatedKnowledgeItem = new KnowledgeItem();
        partialUpdatedKnowledgeItem.setId(knowledgeItem.getId());

        partialUpdatedKnowledgeItem.content(UPDATED_CONTENT).category(UPDATED_CATEGORY);

        restKnowledgeItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKnowledgeItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedKnowledgeItem))
            )
            .andExpect(status().isOk());

        // Validate the KnowledgeItem in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertKnowledgeItemUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedKnowledgeItem, knowledgeItem),
            getPersistedKnowledgeItem(knowledgeItem)
        );
    }

    @Test
    void fullUpdateKnowledgeItemWithPatch() throws Exception {
        // Initialize the database
        insertedKnowledgeItem = knowledgeItemRepository.save(knowledgeItem);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the knowledgeItem using partial update
        KnowledgeItem partialUpdatedKnowledgeItem = new KnowledgeItem();
        partialUpdatedKnowledgeItem.setId(knowledgeItem.getId());

        partialUpdatedKnowledgeItem
            .title(UPDATED_TITLE)
            .titleEn(UPDATED_TITLE_EN)
            .excerpt(UPDATED_EXCERPT)
            .excerptEn(UPDATED_EXCERPT_EN)
            .content(UPDATED_CONTENT)
            .contentEn(UPDATED_CONTENT_EN)
            .category(UPDATED_CATEGORY)
            .categoryEn(UPDATED_CATEGORY_EN)
            .level(UPDATED_LEVEL)
            .levelEn(UPDATED_LEVEL_EN)
            .author(UPDATED_AUTHOR)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .readTime(UPDATED_READ_TIME)
            .image(UPDATED_IMAGE);

        restKnowledgeItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedKnowledgeItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedKnowledgeItem))
            )
            .andExpect(status().isOk());

        // Validate the KnowledgeItem in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertKnowledgeItemUpdatableFieldsEquals(partialUpdatedKnowledgeItem, getPersistedKnowledgeItem(partialUpdatedKnowledgeItem));
    }

    @Test
    void patchNonExistingKnowledgeItem() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeItem.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKnowledgeItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, knowledgeItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(knowledgeItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchKnowledgeItem() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeItem.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(knowledgeItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamKnowledgeItem() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        knowledgeItem.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restKnowledgeItemMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(knowledgeItem)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the KnowledgeItem in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteKnowledgeItem() throws Exception {
        // Initialize the database
        insertedKnowledgeItem = knowledgeItemRepository.save(knowledgeItem);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the knowledgeItem
        restKnowledgeItemMockMvc
            .perform(delete(ENTITY_API_URL_ID, knowledgeItem.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return knowledgeItemRepository.count();
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

    protected KnowledgeItem getPersistedKnowledgeItem(KnowledgeItem knowledgeItem) {
        return knowledgeItemRepository.findById(knowledgeItem.getId()).orElseThrow();
    }

    protected void assertPersistedKnowledgeItemToMatchAllProperties(KnowledgeItem expectedKnowledgeItem) {
        assertKnowledgeItemAllPropertiesEquals(expectedKnowledgeItem, getPersistedKnowledgeItem(expectedKnowledgeItem));
    }

    protected void assertPersistedKnowledgeItemToMatchUpdatableProperties(KnowledgeItem expectedKnowledgeItem) {
        assertKnowledgeItemAllUpdatablePropertiesEquals(expectedKnowledgeItem, getPersistedKnowledgeItem(expectedKnowledgeItem));
    }
}
