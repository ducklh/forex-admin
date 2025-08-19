package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.CustomerSupport;
import com.actionnow.knetwork.repository.CustomerSupportRepository;
import com.actionnow.knetwork.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.actionnow.knetwork.domain.CustomerSupport}.
 */
@RestController
@RequestMapping("/api/customer-supports")
public class CustomerSupportResource {

    private static final Logger LOG = LoggerFactory.getLogger(CustomerSupportResource.class);

    private static final String ENTITY_NAME = "customerSupport";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerSupportRepository customerSupportRepository;

    public CustomerSupportResource(CustomerSupportRepository customerSupportRepository) {
        this.customerSupportRepository = customerSupportRepository;
    }

    /**
     * {@code POST  /customer-supports} : Create a new customerSupport.
     *
     * @param customerSupport the customerSupport to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customerSupport, or with status {@code 400 (Bad Request)} if the customerSupport has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CustomerSupport> createCustomerSupport(@Valid @RequestBody CustomerSupport customerSupport)
        throws URISyntaxException {
        LOG.debug("REST request to save CustomerSupport : {}", customerSupport);
        if (customerSupport.getId() != null) {
            throw new BadRequestAlertException("A new customerSupport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        customerSupport = customerSupportRepository.save(customerSupport);
        return ResponseEntity.created(new URI("/api/customer-supports/" + customerSupport.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, customerSupport.getId()))
            .body(customerSupport);
    }

    /**
     * {@code PUT  /customer-supports/:id} : Updates an existing customerSupport.
     *
     * @param id the id of the customerSupport to save.
     * @param customerSupport the customerSupport to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerSupport,
     * or with status {@code 400 (Bad Request)} if the customerSupport is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customerSupport couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CustomerSupport> updateCustomerSupport(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CustomerSupport customerSupport
    ) throws URISyntaxException {
        LOG.debug("REST request to update CustomerSupport : {}, {}", id, customerSupport);
        if (customerSupport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, customerSupport.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!customerSupportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        customerSupport = customerSupportRepository.save(customerSupport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customerSupport.getId()))
            .body(customerSupport);
    }

    /**
     * {@code PATCH  /customer-supports/:id} : Partial updates given fields of an existing customerSupport, field will ignore if it is null
     *
     * @param id the id of the customerSupport to save.
     * @param customerSupport the customerSupport to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerSupport,
     * or with status {@code 400 (Bad Request)} if the customerSupport is not valid,
     * or with status {@code 404 (Not Found)} if the customerSupport is not found,
     * or with status {@code 500 (Internal Server Error)} if the customerSupport couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CustomerSupport> partialUpdateCustomerSupport(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CustomerSupport customerSupport
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CustomerSupport partially : {}, {}", id, customerSupport);
        if (customerSupport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, customerSupport.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!customerSupportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CustomerSupport> result = customerSupportRepository
            .findById(customerSupport.getId())
            .map(existingCustomerSupport -> {
                if (customerSupport.getValue() != null) {
                    existingCustomerSupport.setValue(customerSupport.getValue());
                }
                if (customerSupport.getValueEn() != null) {
                    existingCustomerSupport.setValueEn(customerSupport.getValueEn());
                }

                return existingCustomerSupport;
            })
            .map(customerSupportRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customerSupport.getId())
        );
    }

    /**
     * {@code GET  /customer-supports} : get all the customerSupports.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerSupports in body.
     */
    @GetMapping("")
    public List<CustomerSupport> getAllCustomerSupports() {
        LOG.debug("REST request to get all CustomerSupports");
        return customerSupportRepository.findAll();
    }

    /**
     * {@code GET  /customer-supports/:id} : get the "id" customerSupport.
     *
     * @param id the id of the customerSupport to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customerSupport, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CustomerSupport> getCustomerSupport(@PathVariable("id") String id) {
        LOG.debug("REST request to get CustomerSupport : {}", id);
        Optional<CustomerSupport> customerSupport = customerSupportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerSupport);
    }

    /**
     * {@code DELETE  /customer-supports/:id} : delete the "id" customerSupport.
     *
     * @param id the id of the customerSupport to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerSupport(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CustomerSupport : {}", id);
        customerSupportRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
