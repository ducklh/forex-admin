package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.CryptoPro;
import com.actionnow.knetwork.repository.CryptoProRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.CryptoPro}.
 */
@RestController
@RequestMapping("/api/crypto-pros")
public class CryptoProResource {

    private static final Logger LOG = LoggerFactory.getLogger(CryptoProResource.class);

    private static final String ENTITY_NAME = "cryptoPro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CryptoProRepository cryptoProRepository;

    public CryptoProResource(CryptoProRepository cryptoProRepository) {
        this.cryptoProRepository = cryptoProRepository;
    }

    /**
     * {@code POST  /crypto-pros} : Create a new cryptoPro.
     *
     * @param cryptoPro the cryptoPro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cryptoPro, or with status {@code 400 (Bad Request)} if the cryptoPro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CryptoPro> createCryptoPro(@Valid @RequestBody CryptoPro cryptoPro) throws URISyntaxException {
        LOG.debug("REST request to save CryptoPro : {}", cryptoPro);
        if (cryptoPro.getId() != null) {
            throw new BadRequestAlertException("A new cryptoPro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        cryptoPro = cryptoProRepository.save(cryptoPro);
        return ResponseEntity.created(new URI("/api/crypto-pros/" + cryptoPro.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, cryptoPro.getId()))
            .body(cryptoPro);
    }

    /**
     * {@code PUT  /crypto-pros/:id} : Updates an existing cryptoPro.
     *
     * @param id the id of the cryptoPro to save.
     * @param cryptoPro the cryptoPro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoPro,
     * or with status {@code 400 (Bad Request)} if the cryptoPro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cryptoPro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CryptoPro> updateCryptoPro(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CryptoPro cryptoPro
    ) throws URISyntaxException {
        LOG.debug("REST request to update CryptoPro : {}, {}", id, cryptoPro);
        if (cryptoPro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoPro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoProRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        cryptoPro = cryptoProRepository.save(cryptoPro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoPro.getId()))
            .body(cryptoPro);
    }

    /**
     * {@code PATCH  /crypto-pros/:id} : Partial updates given fields of an existing cryptoPro, field will ignore if it is null
     *
     * @param id the id of the cryptoPro to save.
     * @param cryptoPro the cryptoPro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoPro,
     * or with status {@code 400 (Bad Request)} if the cryptoPro is not valid,
     * or with status {@code 404 (Not Found)} if the cryptoPro is not found,
     * or with status {@code 500 (Internal Server Error)} if the cryptoPro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CryptoPro> partialUpdateCryptoPro(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CryptoPro cryptoPro
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CryptoPro partially : {}, {}", id, cryptoPro);
        if (cryptoPro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoPro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoProRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CryptoPro> result = cryptoProRepository
            .findById(cryptoPro.getId())
            .map(existingCryptoPro -> {
                if (cryptoPro.getValue() != null) {
                    existingCryptoPro.setValue(cryptoPro.getValue());
                }
                if (cryptoPro.getValueEn() != null) {
                    existingCryptoPro.setValueEn(cryptoPro.getValueEn());
                }

                return existingCryptoPro;
            })
            .map(cryptoProRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoPro.getId())
        );
    }

    /**
     * {@code GET  /crypto-pros} : get all the cryptoPros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cryptoPros in body.
     */
    @GetMapping("")
    public List<CryptoPro> getAllCryptoPros() {
        LOG.debug("REST request to get all CryptoPros");
        return cryptoProRepository.findAll();
    }

    /**
     * {@code GET  /crypto-pros/:id} : get the "id" cryptoPro.
     *
     * @param id the id of the cryptoPro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cryptoPro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CryptoPro> getCryptoPro(@PathVariable("id") String id) {
        LOG.debug("REST request to get CryptoPro : {}", id);
        Optional<CryptoPro> cryptoPro = cryptoProRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cryptoPro);
    }

    /**
     * {@code DELETE  /crypto-pros/:id} : delete the "id" cryptoPro.
     *
     * @param id the id of the cryptoPro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCryptoPro(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CryptoPro : {}", id);
        cryptoProRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
