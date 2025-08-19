package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.SecurityFeature;
import com.actionnow.knetwork.repository.SecurityFeatureRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.SecurityFeature}.
 */
@RestController
@RequestMapping("/api/security-features")
public class SecurityFeatureResource {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityFeatureResource.class);

    private static final String ENTITY_NAME = "securityFeature";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SecurityFeatureRepository securityFeatureRepository;

    public SecurityFeatureResource(SecurityFeatureRepository securityFeatureRepository) {
        this.securityFeatureRepository = securityFeatureRepository;
    }

    /**
     * {@code POST  /security-features} : Create a new securityFeature.
     *
     * @param securityFeature the securityFeature to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new securityFeature, or with status {@code 400 (Bad Request)} if the securityFeature has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SecurityFeature> createSecurityFeature(@Valid @RequestBody SecurityFeature securityFeature)
        throws URISyntaxException {
        LOG.debug("REST request to save SecurityFeature : {}", securityFeature);
        if (securityFeature.getId() != null) {
            throw new BadRequestAlertException("A new securityFeature cannot already have an ID", ENTITY_NAME, "idexists");
        }
        securityFeature = securityFeatureRepository.save(securityFeature);
        return ResponseEntity.created(new URI("/api/security-features/" + securityFeature.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, securityFeature.getId()))
            .body(securityFeature);
    }

    /**
     * {@code PUT  /security-features/:id} : Updates an existing securityFeature.
     *
     * @param id the id of the securityFeature to save.
     * @param securityFeature the securityFeature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated securityFeature,
     * or with status {@code 400 (Bad Request)} if the securityFeature is not valid,
     * or with status {@code 500 (Internal Server Error)} if the securityFeature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SecurityFeature> updateSecurityFeature(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody SecurityFeature securityFeature
    ) throws URISyntaxException {
        LOG.debug("REST request to update SecurityFeature : {}, {}", id, securityFeature);
        if (securityFeature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, securityFeature.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!securityFeatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        securityFeature = securityFeatureRepository.save(securityFeature);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, securityFeature.getId()))
            .body(securityFeature);
    }

    /**
     * {@code PATCH  /security-features/:id} : Partial updates given fields of an existing securityFeature, field will ignore if it is null
     *
     * @param id the id of the securityFeature to save.
     * @param securityFeature the securityFeature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated securityFeature,
     * or with status {@code 400 (Bad Request)} if the securityFeature is not valid,
     * or with status {@code 404 (Not Found)} if the securityFeature is not found,
     * or with status {@code 500 (Internal Server Error)} if the securityFeature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SecurityFeature> partialUpdateSecurityFeature(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody SecurityFeature securityFeature
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update SecurityFeature partially : {}, {}", id, securityFeature);
        if (securityFeature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, securityFeature.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!securityFeatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SecurityFeature> result = securityFeatureRepository
            .findById(securityFeature.getId())
            .map(existingSecurityFeature -> {
                if (securityFeature.getValue() != null) {
                    existingSecurityFeature.setValue(securityFeature.getValue());
                }
                if (securityFeature.getValueEn() != null) {
                    existingSecurityFeature.setValueEn(securityFeature.getValueEn());
                }

                return existingSecurityFeature;
            })
            .map(securityFeatureRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, securityFeature.getId())
        );
    }

    /**
     * {@code GET  /security-features} : get all the securityFeatures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of securityFeatures in body.
     */
    @GetMapping("")
    public List<SecurityFeature> getAllSecurityFeatures() {
        LOG.debug("REST request to get all SecurityFeatures");
        return securityFeatureRepository.findAll();
    }

    /**
     * {@code GET  /security-features/:id} : get the "id" securityFeature.
     *
     * @param id the id of the securityFeature to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the securityFeature, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SecurityFeature> getSecurityFeature(@PathVariable("id") String id) {
        LOG.debug("REST request to get SecurityFeature : {}", id);
        Optional<SecurityFeature> securityFeature = securityFeatureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(securityFeature);
    }

    /**
     * {@code DELETE  /security-features/:id} : delete the "id" securityFeature.
     *
     * @param id the id of the securityFeature to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSecurityFeature(@PathVariable("id") String id) {
        LOG.debug("REST request to delete SecurityFeature : {}", id);
        securityFeatureRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
