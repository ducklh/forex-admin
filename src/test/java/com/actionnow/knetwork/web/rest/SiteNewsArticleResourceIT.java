package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.SiteNewsArticleAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.SiteNewsArticle;
import com.actionnow.knetwork.repository.SiteNewsArticleRepository;
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
 * Integration tests for the {@link SiteNewsArticleResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class SiteNewsArticleResourceIT {

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

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final Instant DEFAULT_PUBLISHED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PUBLISHED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_READ_TIME = "AAAAAAAAAA";
    private static final String UPDATED_READ_TIME = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_FULL_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_FULL_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_FULL_CONTENT_EN = "AAAAAAAAAA";
    private static final String UPDATED_FULL_CONTENT_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/site-news-articles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private SiteNewsArticleRepository siteNewsArticleRepository;

    @Mock
    private SiteNewsArticleRepository siteNewsArticleRepositoryMock;

    @Autowired
    private MockMvc restSiteNewsArticleMockMvc;

    private SiteNewsArticle siteNewsArticle;

    private SiteNewsArticle insertedSiteNewsArticle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SiteNewsArticle createEntity() {
        return new SiteNewsArticle()
            .title(DEFAULT_TITLE)
            .titleEn(DEFAULT_TITLE_EN)
            .excerpt(DEFAULT_EXCERPT)
            .excerptEn(DEFAULT_EXCERPT_EN)
            .content(DEFAULT_CONTENT)
            .contentEn(DEFAULT_CONTENT_EN)
            .category(DEFAULT_CATEGORY)
            .categoryEn(DEFAULT_CATEGORY_EN)
            .author(DEFAULT_AUTHOR)
            .publishedAt(DEFAULT_PUBLISHED_AT)
            .readTime(DEFAULT_READ_TIME)
            .image(DEFAULT_IMAGE)
            .fullContent(DEFAULT_FULL_CONTENT)
            .fullContentEn(DEFAULT_FULL_CONTENT_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SiteNewsArticle createUpdatedEntity() {
        return new SiteNewsArticle()
            .title(UPDATED_TITLE)
            .titleEn(UPDATED_TITLE_EN)
            .excerpt(UPDATED_EXCERPT)
            .excerptEn(UPDATED_EXCERPT_EN)
            .content(UPDATED_CONTENT)
            .contentEn(UPDATED_CONTENT_EN)
            .category(UPDATED_CATEGORY)
            .categoryEn(UPDATED_CATEGORY_EN)
            .author(UPDATED_AUTHOR)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .readTime(UPDATED_READ_TIME)
            .image(UPDATED_IMAGE)
            .fullContent(UPDATED_FULL_CONTENT)
            .fullContentEn(UPDATED_FULL_CONTENT_EN);
    }

    @BeforeEach
    public void initTest() {
        siteNewsArticle = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedSiteNewsArticle != null) {
            siteNewsArticleRepository.delete(insertedSiteNewsArticle);
            insertedSiteNewsArticle = null;
        }
    }

    @Test
    void createSiteNewsArticle() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the SiteNewsArticle
        var returnedSiteNewsArticle = om.readValue(
            restSiteNewsArticleMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(siteNewsArticle)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            SiteNewsArticle.class
        );

        // Validate the SiteNewsArticle in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertSiteNewsArticleUpdatableFieldsEquals(returnedSiteNewsArticle, getPersistedSiteNewsArticle(returnedSiteNewsArticle));

        insertedSiteNewsArticle = returnedSiteNewsArticle;
    }

    @Test
    void createSiteNewsArticleWithExistingId() throws Exception {
        // Create the SiteNewsArticle with an existing ID
        siteNewsArticle.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSiteNewsArticleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(siteNewsArticle)))
            .andExpect(status().isBadRequest());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkTitleIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        siteNewsArticle.setTitle(null);

        // Create the SiteNewsArticle, which fails.

        restSiteNewsArticleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(siteNewsArticle)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllSiteNewsArticles() throws Exception {
        // Initialize the database
        insertedSiteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);

        // Get all the siteNewsArticleList
        restSiteNewsArticleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(siteNewsArticle.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].titleEn").value(hasItem(DEFAULT_TITLE_EN)))
            .andExpect(jsonPath("$.[*].excerpt").value(hasItem(DEFAULT_EXCERPT)))
            .andExpect(jsonPath("$.[*].excerptEn").value(hasItem(DEFAULT_EXCERPT_EN)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.[*].contentEn").value(hasItem(DEFAULT_CONTENT_EN)))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY)))
            .andExpect(jsonPath("$.[*].categoryEn").value(hasItem(DEFAULT_CATEGORY_EN)))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR)))
            .andExpect(jsonPath("$.[*].publishedAt").value(hasItem(DEFAULT_PUBLISHED_AT.toString())))
            .andExpect(jsonPath("$.[*].readTime").value(hasItem(DEFAULT_READ_TIME)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.[*].fullContent").value(hasItem(DEFAULT_FULL_CONTENT)))
            .andExpect(jsonPath("$.[*].fullContentEn").value(hasItem(DEFAULT_FULL_CONTENT_EN)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSiteNewsArticlesWithEagerRelationshipsIsEnabled() throws Exception {
        when(siteNewsArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSiteNewsArticleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(siteNewsArticleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSiteNewsArticlesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(siteNewsArticleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSiteNewsArticleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(siteNewsArticleRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getSiteNewsArticle() throws Exception {
        // Initialize the database
        insertedSiteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);

        // Get the siteNewsArticle
        restSiteNewsArticleMockMvc
            .perform(get(ENTITY_API_URL_ID, siteNewsArticle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(siteNewsArticle.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.titleEn").value(DEFAULT_TITLE_EN))
            .andExpect(jsonPath("$.excerpt").value(DEFAULT_EXCERPT))
            .andExpect(jsonPath("$.excerptEn").value(DEFAULT_EXCERPT_EN))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT))
            .andExpect(jsonPath("$.contentEn").value(DEFAULT_CONTENT_EN))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY))
            .andExpect(jsonPath("$.categoryEn").value(DEFAULT_CATEGORY_EN))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR))
            .andExpect(jsonPath("$.publishedAt").value(DEFAULT_PUBLISHED_AT.toString()))
            .andExpect(jsonPath("$.readTime").value(DEFAULT_READ_TIME))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE))
            .andExpect(jsonPath("$.fullContent").value(DEFAULT_FULL_CONTENT))
            .andExpect(jsonPath("$.fullContentEn").value(DEFAULT_FULL_CONTENT_EN));
    }

    @Test
    void getNonExistingSiteNewsArticle() throws Exception {
        // Get the siteNewsArticle
        restSiteNewsArticleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingSiteNewsArticle() throws Exception {
        // Initialize the database
        insertedSiteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the siteNewsArticle
        SiteNewsArticle updatedSiteNewsArticle = siteNewsArticleRepository.findById(siteNewsArticle.getId()).orElseThrow();
        updatedSiteNewsArticle
            .title(UPDATED_TITLE)
            .titleEn(UPDATED_TITLE_EN)
            .excerpt(UPDATED_EXCERPT)
            .excerptEn(UPDATED_EXCERPT_EN)
            .content(UPDATED_CONTENT)
            .contentEn(UPDATED_CONTENT_EN)
            .category(UPDATED_CATEGORY)
            .categoryEn(UPDATED_CATEGORY_EN)
            .author(UPDATED_AUTHOR)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .readTime(UPDATED_READ_TIME)
            .image(UPDATED_IMAGE)
            .fullContent(UPDATED_FULL_CONTENT)
            .fullContentEn(UPDATED_FULL_CONTENT_EN);

        restSiteNewsArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSiteNewsArticle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedSiteNewsArticle))
            )
            .andExpect(status().isOk());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedSiteNewsArticleToMatchAllProperties(updatedSiteNewsArticle);
    }

    @Test
    void putNonExistingSiteNewsArticle() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        siteNewsArticle.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSiteNewsArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, siteNewsArticle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(siteNewsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchSiteNewsArticle() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        siteNewsArticle.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSiteNewsArticleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(siteNewsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamSiteNewsArticle() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        siteNewsArticle.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSiteNewsArticleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(siteNewsArticle)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateSiteNewsArticleWithPatch() throws Exception {
        // Initialize the database
        insertedSiteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the siteNewsArticle using partial update
        SiteNewsArticle partialUpdatedSiteNewsArticle = new SiteNewsArticle();
        partialUpdatedSiteNewsArticle.setId(siteNewsArticle.getId());

        partialUpdatedSiteNewsArticle
            .titleEn(UPDATED_TITLE_EN)
            .excerpt(UPDATED_EXCERPT)
            .excerptEn(UPDATED_EXCERPT_EN)
            .contentEn(UPDATED_CONTENT_EN)
            .categoryEn(UPDATED_CATEGORY_EN)
            .fullContentEn(UPDATED_FULL_CONTENT_EN);

        restSiteNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSiteNewsArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSiteNewsArticle))
            )
            .andExpect(status().isOk());

        // Validate the SiteNewsArticle in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSiteNewsArticleUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedSiteNewsArticle, siteNewsArticle),
            getPersistedSiteNewsArticle(siteNewsArticle)
        );
    }

    @Test
    void fullUpdateSiteNewsArticleWithPatch() throws Exception {
        // Initialize the database
        insertedSiteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the siteNewsArticle using partial update
        SiteNewsArticle partialUpdatedSiteNewsArticle = new SiteNewsArticle();
        partialUpdatedSiteNewsArticle.setId(siteNewsArticle.getId());

        partialUpdatedSiteNewsArticle
            .title(UPDATED_TITLE)
            .titleEn(UPDATED_TITLE_EN)
            .excerpt(UPDATED_EXCERPT)
            .excerptEn(UPDATED_EXCERPT_EN)
            .content(UPDATED_CONTENT)
            .contentEn(UPDATED_CONTENT_EN)
            .category(UPDATED_CATEGORY)
            .categoryEn(UPDATED_CATEGORY_EN)
            .author(UPDATED_AUTHOR)
            .publishedAt(UPDATED_PUBLISHED_AT)
            .readTime(UPDATED_READ_TIME)
            .image(UPDATED_IMAGE)
            .fullContent(UPDATED_FULL_CONTENT)
            .fullContentEn(UPDATED_FULL_CONTENT_EN);

        restSiteNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSiteNewsArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedSiteNewsArticle))
            )
            .andExpect(status().isOk());

        // Validate the SiteNewsArticle in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertSiteNewsArticleUpdatableFieldsEquals(
            partialUpdatedSiteNewsArticle,
            getPersistedSiteNewsArticle(partialUpdatedSiteNewsArticle)
        );
    }

    @Test
    void patchNonExistingSiteNewsArticle() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        siteNewsArticle.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSiteNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, siteNewsArticle.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(siteNewsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchSiteNewsArticle() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        siteNewsArticle.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSiteNewsArticleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(siteNewsArticle))
            )
            .andExpect(status().isBadRequest());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamSiteNewsArticle() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        siteNewsArticle.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSiteNewsArticleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(siteNewsArticle)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SiteNewsArticle in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteSiteNewsArticle() throws Exception {
        // Initialize the database
        insertedSiteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the siteNewsArticle
        restSiteNewsArticleMockMvc
            .perform(delete(ENTITY_API_URL_ID, siteNewsArticle.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return siteNewsArticleRepository.count();
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

    protected SiteNewsArticle getPersistedSiteNewsArticle(SiteNewsArticle siteNewsArticle) {
        return siteNewsArticleRepository.findById(siteNewsArticle.getId()).orElseThrow();
    }

    protected void assertPersistedSiteNewsArticleToMatchAllProperties(SiteNewsArticle expectedSiteNewsArticle) {
        assertSiteNewsArticleAllPropertiesEquals(expectedSiteNewsArticle, getPersistedSiteNewsArticle(expectedSiteNewsArticle));
    }

    protected void assertPersistedSiteNewsArticleToMatchUpdatableProperties(SiteNewsArticle expectedSiteNewsArticle) {
        assertSiteNewsArticleAllUpdatablePropertiesEquals(expectedSiteNewsArticle, getPersistedSiteNewsArticle(expectedSiteNewsArticle));
    }
}
