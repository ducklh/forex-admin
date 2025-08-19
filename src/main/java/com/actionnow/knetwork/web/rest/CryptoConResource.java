package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.CryptoCon;
import com.actionnow.knetwork.repository.CryptoConRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.CryptoCon}.
 */
@RestController
@RequestMapping("/api/crypto-cons")
public class CryptoConResource {

    private static final Logger LOG = LoggerFactory.getLogger(CryptoConResource.class);

    private static final String ENTITY_NAME = "cryptoCon";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CryptoConRepository cryptoConRepository;

    public CryptoConResource(CryptoConRepository cryptoConRepository) {
        this.cryptoConRepository = cryptoConRepository;
    }

    /**
     * {@code POST  /crypto-cons} : Create a new cryptoCon.
     *
     * @param cryptoCon the cryptoCon to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cryptoCon, or with status {@code 400 (Bad Request)} if the cryptoCon has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CryptoCon> createCryptoCon(@Valid @RequestBody CryptoCon cryptoCon) throws URISyntaxException {
        LOG.debug("REST request to save CryptoCon : {}", cryptoCon);
        if (cryptoCon.getId() != null) {
            throw new BadRequestAlertException("A new cryptoCon cannot already have an ID", ENTITY_NAME, "idexists");
        }
        cryptoCon = cryptoConRepository.save(cryptoCon);
        return ResponseEntity.created(new URI("/api/crypto-cons/" + cryptoCon.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, cryptoCon.getId()))
            .body(cryptoCon);
    }

    /**
     * {@code PUT  /crypto-cons/:id} : Updates an existing cryptoCon.
     *
     * @param id the id of the cryptoCon to save.
     * @param cryptoCon the cryptoCon to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoCon,
     * or with status {@code 400 (Bad Request)} if the cryptoCon is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cryptoCon couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CryptoCon> updateCryptoCon(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CryptoCon cryptoCon
    ) throws URISyntaxException {
        LOG.debug("REST request to update CryptoCon : {}, {}", id, cryptoCon);
        if (cryptoCon.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoCon.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoConRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        cryptoCon = cryptoConRepository.save(cryptoCon);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoCon.getId()))
            .body(cryptoCon);
    }

    /**
     * {@code PATCH  /crypto-cons/:id} : Partial updates given fields of an existing cryptoCon, field will ignore if it is null
     *
     * @param id the id of the cryptoCon to save.
     * @param cryptoCon the cryptoCon to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoCon,
     * or with status {@code 400 (Bad Request)} if the cryptoCon is not valid,
     * or with status {@code 404 (Not Found)} if the cryptoCon is not found,
     * or with status {@code 500 (Internal Server Error)} if the cryptoCon couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CryptoCon> partialUpdateCryptoCon(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CryptoCon cryptoCon
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CryptoCon partially : {}, {}", id, cryptoCon);
        if (cryptoCon.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoCon.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoConRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CryptoCon> result = cryptoConRepository
            .findById(cryptoCon.getId())
            .map(existingCryptoCon -> {
                if (cryptoCon.getValue() != null) {
                    existingCryptoCon.setValue(cryptoCon.getValue());
                }
                if (cryptoCon.getValueEn() != null) {
                    existingCryptoCon.setValueEn(cryptoCon.getValueEn());
                }

                return existingCryptoCon;
            })
            .map(cryptoConRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoCon.getId())
        );
    }

    /**
     * {@code GET  /crypto-cons} : get all the cryptoCons.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cryptoCons in body.
     */
    @GetMapping("")
    public List<CryptoCon> getAllCryptoCons() {
        LOG.debug("REST request to get all CryptoCons");
        return cryptoConRepository.findAll();
    }

    /**
     * {@code GET  /crypto-cons/:id} : get the "id" cryptoCon.
     *
     * @param id the id of the cryptoCon to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cryptoCon, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CryptoCon> getCryptoCon(@PathVariable("id") String id) {
        LOG.debug("REST request to get CryptoCon : {}", id);
        Optional<CryptoCon> cryptoCon = cryptoConRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cryptoCon);
    }

    /**
     * {@code DELETE  /crypto-cons/:id} : delete the "id" cryptoCon.
     *
     * @param id the id of the cryptoCon to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCryptoCon(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CryptoCon : {}", id);
        cryptoConRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
