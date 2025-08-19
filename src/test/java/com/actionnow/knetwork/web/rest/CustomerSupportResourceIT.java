package com.actionnow.knetwork.web.rest;

import static com.actionnow.knetwork.domain.CustomerSupportAsserts.*;
import static com.actionnow.knetwork.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.actionnow.knetwork.IntegrationTest;
import com.actionnow.knetwork.domain.CustomerSupport;
import com.actionnow.knetwork.repository.CustomerSupportRepository;
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
 * Integration tests for the {@link CustomerSupportResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CustomerSupportResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE_EN = "AAAAAAAAAA";
    private static final String UPDATED_VALUE_EN = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/customer-supports";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CustomerSupportRepository customerSupportRepository;

    @Autowired
    private MockMvc restCustomerSupportMockMvc;

    private CustomerSupport customerSupport;

    private CustomerSupport insertedCustomerSupport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerSupport createEntity() {
        return new CustomerSupport().value(DEFAULT_VALUE).valueEn(DEFAULT_VALUE_EN);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerSupport createUpdatedEntity() {
        return new CustomerSupport().value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);
    }

    @BeforeEach
    public void initTest() {
        customerSupport = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedCustomerSupport != null) {
            customerSupportRepository.delete(insertedCustomerSupport);
            insertedCustomerSupport = null;
        }
    }

    @Test
    void createCustomerSupport() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CustomerSupport
        var returnedCustomerSupport = om.readValue(
            restCustomerSupportMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(customerSupport)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CustomerSupport.class
        );

        // Validate the CustomerSupport in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertCustomerSupportUpdatableFieldsEquals(returnedCustomerSupport, getPersistedCustomerSupport(returnedCustomerSupport));

        insertedCustomerSupport = returnedCustomerSupport;
    }

    @Test
    void createCustomerSupportWithExistingId() throws Exception {
        // Create the CustomerSupport with an existing ID
        customerSupport.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerSupportMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(customerSupport)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkValueIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        customerSupport.setValue(null);

        // Create the CustomerSupport, which fails.

        restCustomerSupportMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(customerSupport)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCustomerSupports() throws Exception {
        // Initialize the database
        insertedCustomerSupport = customerSupportRepository.save(customerSupport);

        // Get all the customerSupportList
        restCustomerSupportMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerSupport.getId())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].valueEn").value(hasItem(DEFAULT_VALUE_EN)));
    }

    @Test
    void getCustomerSupport() throws Exception {
        // Initialize the database
        insertedCustomerSupport = customerSupportRepository.save(customerSupport);

        // Get the customerSupport
        restCustomerSupportMockMvc
            .perform(get(ENTITY_API_URL_ID, customerSupport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerSupport.getId()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.valueEn").value(DEFAULT_VALUE_EN));
    }

    @Test
    void getNonExistingCustomerSupport() throws Exception {
        // Get the customerSupport
        restCustomerSupportMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCustomerSupport() throws Exception {
        // Initialize the database
        insertedCustomerSupport = customerSupportRepository.save(customerSupport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the customerSupport
        CustomerSupport updatedCustomerSupport = customerSupportRepository.findById(customerSupport.getId()).orElseThrow();
        updatedCustomerSupport.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCustomerSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCustomerSupport.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedCustomerSupport))
            )
            .andExpect(status().isOk());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCustomerSupportToMatchAllProperties(updatedCustomerSupport);
    }

    @Test
    void putNonExistingCustomerSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        customerSupport.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, customerSupport.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(customerSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCustomerSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        customerSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerSupportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(customerSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCustomerSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        customerSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerSupportMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(customerSupport)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCustomerSupportWithPatch() throws Exception {
        // Initialize the database
        insertedCustomerSupport = customerSupportRepository.save(customerSupport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the customerSupport using partial update
        CustomerSupport partialUpdatedCustomerSupport = new CustomerSupport();
        partialUpdatedCustomerSupport.setId(customerSupport.getId());

        restCustomerSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCustomerSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCustomerSupport))
            )
            .andExpect(status().isOk());

        // Validate the CustomerSupport in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCustomerSupportUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCustomerSupport, customerSupport),
            getPersistedCustomerSupport(customerSupport)
        );
    }

    @Test
    void fullUpdateCustomerSupportWithPatch() throws Exception {
        // Initialize the database
        insertedCustomerSupport = customerSupportRepository.save(customerSupport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the customerSupport using partial update
        CustomerSupport partialUpdatedCustomerSupport = new CustomerSupport();
        partialUpdatedCustomerSupport.setId(customerSupport.getId());

        partialUpdatedCustomerSupport.value(UPDATED_VALUE).valueEn(UPDATED_VALUE_EN);

        restCustomerSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCustomerSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCustomerSupport))
            )
            .andExpect(status().isOk());

        // Validate the CustomerSupport in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCustomerSupportUpdatableFieldsEquals(
            partialUpdatedCustomerSupport,
            getPersistedCustomerSupport(partialUpdatedCustomerSupport)
        );
    }

    @Test
    void patchNonExistingCustomerSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        customerSupport.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, customerSupport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(customerSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCustomerSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        customerSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerSupportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(customerSupport))
            )
            .andExpect(status().isBadRequest());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCustomerSupport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        customerSupport.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCustomerSupportMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(customerSupport)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CustomerSupport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCustomerSupport() throws Exception {
        // Initialize the database
        insertedCustomerSupport = customerSupportRepository.save(customerSupport);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the customerSupport
        restCustomerSupportMockMvc
            .perform(delete(ENTITY_API_URL_ID, customerSupport.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return customerSupportRepository.count();
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

    protected CustomerSupport getPersistedCustomerSupport(CustomerSupport customerSupport) {
        return customerSupportRepository.findById(customerSupport.getId()).orElseThrow();
    }

    protected void assertPersistedCustomerSupportToMatchAllProperties(CustomerSupport expectedCustomerSupport) {
        assertCustomerSupportAllPropertiesEquals(expectedCustomerSupport, getPersistedCustomerSupport(expectedCustomerSupport));
    }

    protected void assertPersistedCustomerSupportToMatchUpdatableProperties(CustomerSupport expectedCustomerSupport) {
        assertCustomerSupportAllUpdatablePropertiesEquals(expectedCustomerSupport, getPersistedCustomerSupport(expectedCustomerSupport));
    }
}
