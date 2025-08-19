package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.CryptoFeature;
import com.actionnow.knetwork.repository.CryptoFeatureRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.CryptoFeature}.
 */
@RestController
@RequestMapping("/api/crypto-features")
public class CryptoFeatureResource {

    private static final Logger LOG = LoggerFactory.getLogger(CryptoFeatureResource.class);

    private static final String ENTITY_NAME = "cryptoFeature";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CryptoFeatureRepository cryptoFeatureRepository;

    public CryptoFeatureResource(CryptoFeatureRepository cryptoFeatureRepository) {
        this.cryptoFeatureRepository = cryptoFeatureRepository;
    }

    /**
     * {@code POST  /crypto-features} : Create a new cryptoFeature.
     *
     * @param cryptoFeature the cryptoFeature to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cryptoFeature, or with status {@code 400 (Bad Request)} if the cryptoFeature has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CryptoFeature> createCryptoFeature(@Valid @RequestBody CryptoFeature cryptoFeature) throws URISyntaxException {
        LOG.debug("REST request to save CryptoFeature : {}", cryptoFeature);
        if (cryptoFeature.getId() != null) {
            throw new BadRequestAlertException("A new cryptoFeature cannot already have an ID", ENTITY_NAME, "idexists");
        }
        cryptoFeature = cryptoFeatureRepository.save(cryptoFeature);
        return ResponseEntity.created(new URI("/api/crypto-features/" + cryptoFeature.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, cryptoFeature.getId()))
            .body(cryptoFeature);
    }

    /**
     * {@code PUT  /crypto-features/:id} : Updates an existing cryptoFeature.
     *
     * @param id the id of the cryptoFeature to save.
     * @param cryptoFeature the cryptoFeature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoFeature,
     * or with status {@code 400 (Bad Request)} if the cryptoFeature is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cryptoFeature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CryptoFeature> updateCryptoFeature(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CryptoFeature cryptoFeature
    ) throws URISyntaxException {
        LOG.debug("REST request to update CryptoFeature : {}, {}", id, cryptoFeature);
        if (cryptoFeature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoFeature.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoFeatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        cryptoFeature = cryptoFeatureRepository.save(cryptoFeature);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoFeature.getId()))
            .body(cryptoFeature);
    }

    /**
     * {@code PATCH  /crypto-features/:id} : Partial updates given fields of an existing cryptoFeature, field will ignore if it is null
     *
     * @param id the id of the cryptoFeature to save.
     * @param cryptoFeature the cryptoFeature to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoFeature,
     * or with status {@code 400 (Bad Request)} if the cryptoFeature is not valid,
     * or with status {@code 404 (Not Found)} if the cryptoFeature is not found,
     * or with status {@code 500 (Internal Server Error)} if the cryptoFeature couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CryptoFeature> partialUpdateCryptoFeature(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CryptoFeature cryptoFeature
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CryptoFeature partially : {}, {}", id, cryptoFeature);
        if (cryptoFeature.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoFeature.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoFeatureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CryptoFeature> result = cryptoFeatureRepository
            .findById(cryptoFeature.getId())
            .map(existingCryptoFeature -> {
                if (cryptoFeature.getValue() != null) {
                    existingCryptoFeature.setValue(cryptoFeature.getValue());
                }
                if (cryptoFeature.getValueEn() != null) {
                    existingCryptoFeature.setValueEn(cryptoFeature.getValueEn());
                }

                return existingCryptoFeature;
            })
            .map(cryptoFeatureRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoFeature.getId())
        );
    }

    /**
     * {@code GET  /crypto-features} : get all the cryptoFeatures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cryptoFeatures in body.
     */
    @GetMapping("")
    public List<CryptoFeature> getAllCryptoFeatures() {
        LOG.debug("REST request to get all CryptoFeatures");
        return cryptoFeatureRepository.findAll();
    }

    /**
     * {@code GET  /crypto-features/:id} : get the "id" cryptoFeature.
     *
     * @param id the id of the cryptoFeature to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cryptoFeature, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CryptoFeature> getCryptoFeature(@PathVariable("id") String id) {
        LOG.debug("REST request to get CryptoFeature : {}", id);
        Optional<CryptoFeature> cryptoFeature = cryptoFeatureRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cryptoFeature);
    }

    /**
     * {@code DELETE  /crypto-features/:id} : delete the "id" cryptoFeature.
     *
     * @param id the id of the cryptoFeature to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCryptoFeature(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CryptoFeature : {}", id);
        cryptoFeatureRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
