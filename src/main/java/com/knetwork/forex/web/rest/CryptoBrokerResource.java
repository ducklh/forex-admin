package com.knetwork.forex.web.rest;

import com.knetwork.forex.domain.CryptoBroker;
import com.knetwork.forex.repository.CryptoBrokerRepository;
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
 * REST controller for managing {@link com.knetwork.forex.domain.CryptoBroker}.
 */
@RestController
@RequestMapping("/api/crypto-brokers")
public class CryptoBrokerResource {

    private static final Logger LOG = LoggerFactory.getLogger(CryptoBrokerResource.class);

    private static final String ENTITY_NAME = "cryptoBroker";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CryptoBrokerRepository cryptoBrokerRepository;

    public CryptoBrokerResource(CryptoBrokerRepository cryptoBrokerRepository) {
        this.cryptoBrokerRepository = cryptoBrokerRepository;
    }

    /**
     * {@code POST  /crypto-brokers} : Create a new cryptoBroker.
     *
     * @param cryptoBroker the cryptoBroker to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cryptoBroker, or with status {@code 400 (Bad Request)} if the cryptoBroker has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CryptoBroker> createCryptoBroker(@Valid @RequestBody CryptoBroker cryptoBroker) throws URISyntaxException {
        LOG.debug("REST request to save CryptoBroker : {}", cryptoBroker);
        if (cryptoBroker.getId() != null) {
            throw new BadRequestAlertException("A new cryptoBroker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        cryptoBroker = cryptoBrokerRepository.save(cryptoBroker);
        return ResponseEntity.created(new URI("/api/crypto-brokers/" + cryptoBroker.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, cryptoBroker.getId()))
            .body(cryptoBroker);
    }

    /**
     * {@code PUT  /crypto-brokers/:id} : Updates an existing cryptoBroker.
     *
     * @param id the id of the cryptoBroker to save.
     * @param cryptoBroker the cryptoBroker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoBroker,
     * or with status {@code 400 (Bad Request)} if the cryptoBroker is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cryptoBroker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CryptoBroker> updateCryptoBroker(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CryptoBroker cryptoBroker
    ) throws URISyntaxException {
        LOG.debug("REST request to update CryptoBroker : {}, {}", id, cryptoBroker);
        if (cryptoBroker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoBroker.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoBrokerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        cryptoBroker = cryptoBrokerRepository.save(cryptoBroker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoBroker.getId()))
            .body(cryptoBroker);
    }

    /**
     * {@code PATCH  /crypto-brokers/:id} : Partial updates given fields of an existing cryptoBroker, field will ignore if it is null
     *
     * @param id the id of the cryptoBroker to save.
     * @param cryptoBroker the cryptoBroker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cryptoBroker,
     * or with status {@code 400 (Bad Request)} if the cryptoBroker is not valid,
     * or with status {@code 404 (Not Found)} if the cryptoBroker is not found,
     * or with status {@code 500 (Internal Server Error)} if the cryptoBroker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CryptoBroker> partialUpdateCryptoBroker(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CryptoBroker cryptoBroker
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CryptoBroker partially : {}, {}", id, cryptoBroker);
        if (cryptoBroker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cryptoBroker.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cryptoBrokerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CryptoBroker> result = cryptoBrokerRepository
            .findById(cryptoBroker.getId())
            .map(existingCryptoBroker -> {
                if (cryptoBroker.getName() != null) {
                    existingCryptoBroker.setName(cryptoBroker.getName());
                }
                if (cryptoBroker.getLogo() != null) {
                    existingCryptoBroker.setLogo(cryptoBroker.getLogo());
                }
                if (cryptoBroker.getUrl() != null) {
                    existingCryptoBroker.setUrl(cryptoBroker.getUrl());
                }
                if (cryptoBroker.getDescription() != null) {
                    existingCryptoBroker.setDescription(cryptoBroker.getDescription());
                }
                if (cryptoBroker.getRating() != null) {
                    existingCryptoBroker.setRating(cryptoBroker.getRating());
                }
                if (cryptoBroker.getFeatures() != null) {
                    existingCryptoBroker.setFeatures(cryptoBroker.getFeatures());
                }
                if (cryptoBroker.getRegulation() != null) {
                    existingCryptoBroker.setRegulation(cryptoBroker.getRegulation());
                }
                if (cryptoBroker.getMinDeposit() != null) {
                    existingCryptoBroker.setMinDeposit(cryptoBroker.getMinDeposit());
                }
                if (cryptoBroker.getTradingFees() != null) {
                    existingCryptoBroker.setTradingFees(cryptoBroker.getTradingFees());
                }
                if (cryptoBroker.getSupportedCoins() != null) {
                    existingCryptoBroker.setSupportedCoins(cryptoBroker.getSupportedCoins());
                }
                if (cryptoBroker.getPros() != null) {
                    existingCryptoBroker.setPros(cryptoBroker.getPros());
                }
                if (cryptoBroker.getCons() != null) {
                    existingCryptoBroker.setCons(cryptoBroker.getCons());
                }
                if (cryptoBroker.getFounded() != null) {
                    existingCryptoBroker.setFounded(cryptoBroker.getFounded());
                }
                if (cryptoBroker.getHeadquarters() != null) {
                    existingCryptoBroker.setHeadquarters(cryptoBroker.getHeadquarters());
                }
                if (cryptoBroker.getTradingVolume() != null) {
                    existingCryptoBroker.setTradingVolume(cryptoBroker.getTradingVolume());
                }
                if (cryptoBroker.getSecurityFeatures() != null) {
                    existingCryptoBroker.setSecurityFeatures(cryptoBroker.getSecurityFeatures());
                }
                if (cryptoBroker.getPaymentMethods() != null) {
                    existingCryptoBroker.setPaymentMethods(cryptoBroker.getPaymentMethods());
                }
                if (cryptoBroker.getCustomerSupport() != null) {
                    existingCryptoBroker.setCustomerSupport(cryptoBroker.getCustomerSupport());
                }
                if (cryptoBroker.getMobileApp() != null) {
                    existingCryptoBroker.setMobileApp(cryptoBroker.getMobileApp());
                }
                if (cryptoBroker.getApiSupport() != null) {
                    existingCryptoBroker.setApiSupport(cryptoBroker.getApiSupport());
                }
                if (cryptoBroker.getDetailedDescription() != null) {
                    existingCryptoBroker.setDetailedDescription(cryptoBroker.getDetailedDescription());
                }

                return existingCryptoBroker;
            })
            .map(cryptoBrokerRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cryptoBroker.getId())
        );
    }

    /**
     * {@code GET  /crypto-brokers} : get all the cryptoBrokers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cryptoBrokers in body.
     */
    @GetMapping("")
    public List<CryptoBroker> getAllCryptoBrokers() {
        LOG.debug("REST request to get all CryptoBrokers");
        return cryptoBrokerRepository.findAll();
    }

    /**
     * {@code GET  /crypto-brokers/:id} : get the "id" cryptoBroker.
     *
     * @param id the id of the cryptoBroker to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cryptoBroker, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CryptoBroker> getCryptoBroker(@PathVariable("id") String id) {
        LOG.debug("REST request to get CryptoBroker : {}", id);
        Optional<CryptoBroker> cryptoBroker = cryptoBrokerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cryptoBroker);
    }

    /**
     * {@code DELETE  /crypto-brokers/:id} : delete the "id" cryptoBroker.
     *
     * @param id the id of the cryptoBroker to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCryptoBroker(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CryptoBroker : {}", id);
        cryptoBrokerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
