package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.LanguageSupportAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.LanguageSupport;
import com.actionnow.knetwork.repository.LanguageSupportRepository;
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
 * Integration tests for the {@link LanguageSupportResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LanguageSupportResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/language-supports";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LanguageSupportRepository languageSupportRepository;

    @Autowired
    private MockMvc restLanguageSupportMockMvc;

    private LanguageSupport languageSupport;

    private LanguageSupport insertedLanguageSupport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LanguageSupport createEntity() {
        return new LanguageSupport().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LanguageSupport createUpdatedEntity() {
        return new LanguageSupport().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        languageSupport = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedLanguageSupport != null) {
            languageSupportRepository.delete(insertedLanguageSupport);
            insertedLanguageSupport = null;
        }
    }

    @Test
    void createLanguageSupport() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LanguageSupport
        var returnedLanguageSupport = om.readValue(
            restLanguageSupportMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(languageSupport)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LanguageSupport.class
        );

        // Validate the LanguageSupport in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertLanguageSupportUpdatableFieldsEquals(returnedLanguageSupport, getPersistedLanguageSupport(returnedLanguageSupport));

        insertedLanguageSupport = returnedLanguageSupport;
    }

    @Test
    void createLanguageSupportWithExistingId() throws Exception {
        // Create the LanguageSupport with an existing ID
        languageSupport.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLanguageSupportMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(languageSupport)))
            .andExpect(status().isBadRequest());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        languageSupport.setValue(null);

        // Create the LanguageSupport, which fails.

        restLanguageSupportMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(languageSupport)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllLanguageSupports() throws Exception {
        // Initialize the database
        insertedLanguageSupport = languageSupportRepository.save(languageSupport);

        // Get all the languageSupportList
        restLanguageSupportMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(languageSupport.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getLanguageSupport() throws Exception {
        // Initialize the database
        insertedLanguageSupport = languageSupportRepository.save(languageSupport);

        // Get the languageSupport
        restLanguageSupportMockMvc
            .perform(get(ENTITY_API_URL_ID, languageSupport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(languageSupport.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingLanguageSupport() throws Exception {
        // Get the languageSupport
        restLanguageSupportMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingLanguageSupport() throws Exception {
        // Initialize the database
        insertedLanguageSupport = languageSupportRepository.save(languageSupport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the languageSupport
        LanguageSupport updatedLanguageSupport = languageSupportRepository.findById(languageSupport.getId()).orElseThrow();
        updatedLanguageSupport.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restLanguageSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLanguageSupport.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedLanguageSupport))
            )
            .andExpect(status().isOk());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLanguageSupportToMatchAllProperties(updatedLanguageSupport);
    }

    @Test
    void putNonExistingLanguageSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        languageSupport.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLanguageSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, languageSupport.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(languageSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchLanguageSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        languageSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLanguageSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(languageSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamLanguageSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        languageSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLanguageSupportMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(languageSupport)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateLanguageSupportWithPatch() throws Exception {
        // Initialize the database
        insertedLanguageSupport = languageSupportRepository.save(languageSupport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the languageSupport using partial update
        LanguageSupport partialUpdatedLanguageSupport = new LanguageSupport();
        partialUpdatedLanguageSupport.setId(languageSupport.getId());

        partialUpdatedLanguageSupport.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restLanguageSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLanguageSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLanguageSupport))
            )
            .andExpect(status().isOk());

        // Validate the LanguageSupport in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLanguageSupportUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedLanguageSupport, languageSupport),
            getPersistedLanguageSupport(languageSupport)
        );
    }

    @Test
    void fullUpdateLanguageSupportWithPatch() throws Exception {
        // Initialize the database
        insertedLanguageSupport = languageSupportRepository.save(languageSupport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the languageSupport using partial update
        LanguageSupport partialUpdatedLanguageSupport = new LanguageSupport();
        partialUpdatedLanguageSupport.setId(languageSupport.getId());

        partialUpdatedLanguageSupport.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restLanguageSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLanguageSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLanguageSupport))
            )
            .andExpect(status().isOk());

        // Validate the LanguageSupport in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLanguageSupportUpdatableFieldsEquals(
            partialUpdatedLanguageSupport,
            getPersistedLanguageSupport(partialUpdatedLanguageSupport)
        );
    }

    @Test
    void patchNonExistingLanguageSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        languageSupport.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLanguageSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, languageSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(languageSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchLanguageSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        languageSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLanguageSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(languageSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamLanguageSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        languageSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLanguageSupportMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(languageSupport)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LanguageSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteLanguageSupport() throws Exception {
        // Initialize the database
        insertedLanguageSupport = languageSupportRepository.save(languageSupport);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the languageSupport
        restLanguageSupportMockMvc
            .perform(delete(ENTITY_API_URL_ID, languageSupport.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return languageSupportRepository.count();
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

    protected LanguageSupport getPersistedLanguageSupport(LanguageSupport languageSupport) {
        return languageSupportRepository.findById(languageSupport.getId()).orElseThrow();
    }

    protected void assertPersistedLanguageSupportToMatchAllProperties(LanguageSupport expectedLanguageSupport) {
        assertLanguageSupportAllPropertiesEquals(expectedLanguageSupport, getPersistedLanguageSupport(expectedLanguageSupport));
    }

    protected void assertPersistedLanguageSupportToMatchUpdatableProperties(LanguageSupport expectedLanguageSupport) {
        assertLanguageSupportAllUpdatablePropertiesEquals(expectedLanguageSupport, getPersistedLanguageSupport(expectedLanguageSupport));
    }
}
