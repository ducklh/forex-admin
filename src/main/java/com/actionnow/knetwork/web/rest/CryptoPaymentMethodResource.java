package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.CryptoPaymentMethod;
import com.actionnow.knetwork.repository.CryptoPaymentMethodRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.CryptoPaymentMethod}.
 */
@RestController
@RequestMapping("/api/crypto-payment-methods")
public class CryptoPaymentMethodResource {

    private static final Logger LOG = LoggerFactory.getLogger(CryptoPaymentMethodResource.class);

    private static final String ENTITY_NAME = "cryptoPaymentMethod";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CryptoPaymentMethodRepository cryptoPaymentMethodRepository;

    public CryptoPaymentMethodResource(CryptoPaymentMethodRepository cryptoPaymentMethodRepository) {
        this.cryptoPaymentMethodRepository = cryptoPaymentMethodRepository;
    }

    /**
     * {@code POST  /crypto-payment-methods} : Create a new cryptoPaymentMethod.
     *
     * @param cryptoPaymentMethod the cryptoPaymentMethod to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cryptoPaymentMethod, or with status {@code 400 (Bad Request)} if the cryptoPaymentMethod has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CryptoPaymentMethod> createCryptoPaymentMethod(@Valid @RequestBody CryptoPaymentMethod cryptoPaymentMethod)
        throws URISyntaxException {
        LOG.debug("REST request to save CryptoPaymentMethod : {}", cryptoPaymentMethod);
        if (cryptoPaymentMethod.getId() != null) {
            throw new BadRequestAlertException("A new cryptoPaymentMethod cannot already have an ID", ENTITY_NAME, "idexists");
        }
        cryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);
        return ResponseEntity.created(new URI("/api/crypto-payment-methods/" + cryptoPaymentMethod.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, cryptoPaymentMethod.getId()))
            .body(cryptoPaymentMethod);
    }

    /**
     * {@code PUT  /crypto-payment-methods/:id} : Updates an existing cryptoPaymentMethod.
     *
     * @param id the id of the cryptoPaymentMethod to save.
     * @param cryptoPaymentMethod the cryptoPaymentMethod to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoPaymentMethod,
     * or with status {@code 400 (Bad Request)} if the cryptoPaymentMethod is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cryptoPaymentMethod couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CryptoPaymentMethod> updateCryptoPaymentMethod(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CryptoPaymentMethod cryptoPaymentMethod
    ) throws URISyntaxException {
        LOG.debug("REST request to update CryptoPaymentMethod : {}, {}", id, cryptoPaymentMethod);
        if (cryptoPaymentMethod.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoPaymentMethod.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoPaymentMethodRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        cryptoPaymentMethod = cryptoPaymentMethodRepository.save(cryptoPaymentMethod);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoPaymentMethod.getId()))
            .body(cryptoPaymentMethod);
    }

    /**
     * {@code PATCH  /crypto-payment-methods/:id} : Partial updates given fields of an existing cryptoPaymentMethod, field will ignore if it is null
     *
     * @param id the id of the cryptoPaymentMethod to save.
     * @param cryptoPaymentMethod the cryptoPaymentMethod to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoPaymentMethod,
     * or with status {@code 400 (Bad Request)} if the cryptoPaymentMethod is not valid,
     * or with status {@code 404 (Not Found)} if the cryptoPaymentMethod is not found,
     * or with status {@code 500 (Internal Server Error)} if the cryptoPaymentMethod couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CryptoPaymentMethod> partialUpdateCryptoPaymentMethod(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CryptoPaymentMethod cryptoPaymentMethod
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CryptoPaymentMethod partially : {}, {}", id, cryptoPaymentMethod);
        if (cryptoPaymentMethod.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoPaymentMethod.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoPaymentMethodRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CryptoPaymentMethod> result = cryptoPaymentMethodRepository
            .findById(cryptoPaymentMethod.getId())
            .map(existingCryptoPaymentMethod -> {
                if (cryptoPaymentMethod.getValue() != null) {
                    existingCryptoPaymentMethod.setValue(cryptoPaymentMethod.getValue());
                }
                if (cryptoPaymentMethod.getValueEn() != null) {
                    existingCryptoPaymentMethod.setValueEn(cryptoPaymentMethod.getValueEn());
                }

                return existingCryptoPaymentMethod;
            })
            .map(cryptoPaymentMethodRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoPaymentMethod.getId())
        );
    }

    /**
     * {@code GET  /crypto-payment-methods} : get all the cryptoPaymentMethods.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cryptoPaymentMethods in body.
     */
    @GetMapping("")
    public List<CryptoPaymentMethod> getAllCryptoPaymentMethods() {
        LOG.debug("REST request to get all CryptoPaymentMethods");
        return cryptoPaymentMethodRepository.findAll();
    }

    /**
     * {@code GET  /crypto-payment-methods/:id} : get the "id" cryptoPaymentMethod.
     *
     * @param id the id of the cryptoPaymentMethod to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cryptoPaymentMethod, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CryptoPaymentMethod> getCryptoPaymentMethod(@PathVariable("id") String id) {
        LOG.debug("REST request to get CryptoPaymentMethod : {}", id);
        Optional<CryptoPaymentMethod> cryptoPaymentMethod = cryptoPaymentMethodRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cryptoPaymentMethod);
    }

    /**
     * {@code DELETE  /crypto-payment-methods/:id} : delete the "id" cryptoPaymentMethod.
     *
     * @param id the id of the cryptoPaymentMethod to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCryptoPaymentMethod(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CryptoPaymentMethod : {}", id);
        cryptoPaymentMethodRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
