package com.knetwork.forex.web.rest;

import com.knetwork.forex.domain.Support;
import com.knetwork.forex.repository.SupportRepository;
import com.knetwork.forex.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing {@link com.knetwork.forex.domain.Support}.
 */
@RestController
@RequestMapping("/api/supports")
public class SupportResource {

    private static final Logger LOG = LoggerFactory.getLogger(SupportResource.class);

    private static final String ENTITY_NAME = "support";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupportRepository supportRepository;

    public SupportResource(SupportRepository supportRepository) {
        this.supportRepository = supportRepository;
    }

    /**
     * {@code POST  /supports} : Create a new support.
     *
     * @param support the support to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new support, or with status {@code 400 (Bad Request)} if the support has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Support> createSupport(@Valid @RequestBody Support support) throws URISyntaxException {
        LOG.debug("REST request to save Support : {}", support);
        if (support.getId() != null) {
            throw new BadRequestAlertException("A new support cannot already have an ID", ENTITY_NAME, "idexists");
        }
        support = supportRepository.save(support);
        return ResponseEntity.created(new URI("/api/supports/" + support.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, support.getId()))
            .body(support);
    }

    /**
     * {@code PUT  /supports/:id} : Updates an existing support.
     *
     * @param id the id of the support to save.
     * @param support the support to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated support,
     * or with status {@code 400 (Bad Request)} if the support is not valid,
     * or with status {@code 500 (Internal Server Error)} if the support couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Support> updateSupport(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Support support
    ) throws URISyntaxException {
        LOG.debug("REST request to update Support : {}, {}", id, support);
        if (support.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, support.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!supportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        support = supportRepository.save(support);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, support.getId()))
            .body(support);
    }

    /**
     * {@code PATCH  /supports/:id} : Partial updates given fields of an existing support, field will ignore if it is null
     *
     * @param id the id of the support to save.
     * @param support the support to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated support,
     * or with status {@code 400 (Bad Request)} if the support is not valid,
     * or with status {@code 404 (Not Found)} if the support is not found,
     * or with status {@code 500 (Internal Server Error)} if the support couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Support> partialUpdateSupport(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Support support
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Support partially : {}, {}", id, support);
        if (support.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, support.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!supportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Support> result = supportRepository
            .findById(support.getId())
            .map(existingSupport -> {
                if (support.getType() != null) {
                    existingSupport.setType(support.getType());
                }

                return existingSupport;
            })
            .map(supportRepository::save);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, support.getId()));
    }

    /**
     * {@code GET  /supports} : get all the supports.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supports in body.
     */
    @GetMapping("")
    public List<Support> getAllSupports() {
        LOG.debug("REST request to get all Supports");
        return supportRepository.findAll();
    }

    /**
     * {@code GET  /supports/:id} : get the "id" support.
     *
     * @param id the id of the support to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the support, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Support> getSupport(@PathVariable("id") String id) {
        LOG.debug("REST request to get Support : {}", id);
        Optional<Support> support = supportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(support);
    }

    /**
     * {@code DELETE  /supports/:id} : delete the "id" support.
     *
     * @param id the id of the support to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupport(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Support : {}", id);
        supportRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
