package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.ForexBroker;
import com.actionnow.knetwork.repository.ForexBrokerRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.ForexBroker}.
 */
@RestController
@RequestMapping("/api/forex-brokers")
public class ForexBrokerResource {

    private static final Logger LOG = LoggerFactory.getLogger(ForexBrokerResource.class);

    private static final String ENTITY_NAME = "forexBroker";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ForexBrokerRepository forexBrokerRepository;

    public ForexBrokerResource(ForexBrokerRepository forexBrokerRepository) {
        this.forexBrokerRepository = forexBrokerRepository;
    }

    /**
     * {@code POST  /forex-brokers} : Create a new forexBroker.
     *
     * @param forexBroker the forexBroker to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new forexBroker, or with status {@code 400 (Bad Request)} if the forexBroker has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ForexBroker> createForexBroker(@Valid @RequestBody ForexBroker forexBroker) throws URISyntaxException {
        LOG.debug("REST request to save ForexBroker : {}", forexBroker);
        if (forexBroker.getId() != null) {
            throw new BadRequestAlertException("A new forexBroker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        forexBroker = forexBrokerRepository.save(forexBroker);
        return ResponseEntity.created(new URI("/api/forex-brokers/" + forexBroker.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, forexBroker.getId()))
            .body(forexBroker);
    }

    /**
     * {@code PUT  /forex-brokers/:id} : Updates an existing forexBroker.
     *
     * @param id the id of the forexBroker to save.
     * @param forexBroker the forexBroker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated forexBroker,
     * or with status {@code 400 (Bad Request)} if the forexBroker is not valid,
     * or with status {@code 500 (Internal Server Error)} if the forexBroker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ForexBroker> updateForexBroker(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ForexBroker forexBroker
    ) throws URISyntaxException {
        LOG.debug("REST request to update ForexBroker : {}, {}", id, forexBroker);
        if (forexBroker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, forexBroker.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!forexBrokerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        forexBroker = forexBrokerRepository.save(forexBroker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, forexBroker.getId()))
            .body(forexBroker);
    }

    /**
     * {@code PATCH  /forex-brokers/:id} : Partial updates given fields of an existing forexBroker, field will ignore if it is null
     *
     * @param id the id of the forexBroker to save.
     * @param forexBroker the forexBroker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated forexBroker,
     * or with status {@code 400 (Bad Request)} if the forexBroker is not valid,
     * or with status {@code 404 (Not Found)} if the forexBroker is not found,
     * or with status {@code 500 (Internal Server Error)} if the forexBroker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ForexBroker> partialUpdateForexBroker(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ForexBroker forexBroker
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ForexBroker partially : {}, {}", id, forexBroker);
        if (forexBroker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, forexBroker.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!forexBrokerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ForexBroker> result = forexBrokerRepository
            .findById(forexBroker.getId())
            .map(existingForexBroker -> {
                if (forexBroker.getName() != null) {
                    existingForexBroker.setName(forexBroker.getName());
                }
                if (forexBroker.getNameEn() != null) {
                    existingForexBroker.setNameEn(forexBroker.getNameEn());
                }
                if (forexBroker.getLogo() != null) {
                    existingForexBroker.setLogo(forexBroker.getLogo());
                }
                if (forexBroker.getUrl() != null) {
                    existingForexBroker.setUrl(forexBroker.getUrl());
                }
                if (forexBroker.getDescription() != null) {
                    existingForexBroker.setDescription(forexBroker.getDescription());
                }
                if (forexBroker.getDescriptionEn() != null) {
                    existingForexBroker.setDescriptionEn(forexBroker.getDescriptionEn());
                }
                if (forexBroker.getRating() != null) {
                    existingForexBroker.setRating(forexBroker.getRating());
                }
                if (forexBroker.getRegulation() != null) {
                    existingForexBroker.setRegulation(forexBroker.getRegulation());
                }
                if (forexBroker.getMinDeposit() != null) {
                    existingForexBroker.setMinDeposit(forexBroker.getMinDeposit());
                }
                if (forexBroker.getSpreads() != null) {
                    existingForexBroker.setSpreads(forexBroker.getSpreads());
                }
                if (forexBroker.getLeverage() != null) {
                    existingForexBroker.setLeverage(forexBroker.getLeverage());
                }
                if (forexBroker.getFounded() != null) {
                    existingForexBroker.setFounded(forexBroker.getFounded());
                }
                if (forexBroker.getHeadquarters() != null) {
                    existingForexBroker.setHeadquarters(forexBroker.getHeadquarters());
                }
                if (forexBroker.getHeadquartersEn() != null) {
                    existingForexBroker.setHeadquartersEn(forexBroker.getHeadquartersEn());
                }

                return existingForexBroker;
            })
            .map(forexBrokerRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, forexBroker.getId())
        );
    }

    /**
     * {@code GET  /forex-brokers} : get all the forexBrokers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of forexBrokers in body.
     */
    @GetMapping("")
    public List<ForexBroker> getAllForexBrokers(
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get all ForexBrokers");
        if (eagerload) {
            return forexBrokerRepository.findAllWithEagerRelationships();
        } else {
            return forexBrokerRepository.findAll();
        }
    }

    /**
     * {@code GET  /forex-brokers/:id} : get the "id" forexBroker.
     *
     * @param id the id of the forexBroker to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the forexBroker, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ForexBroker> getForexBroker(@PathVariable("id") String id) {
        LOG.debug("REST request to get ForexBroker : {}", id);
        Optional<ForexBroker> forexBroker = forexBrokerRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(forexBroker);
    }

    /**
     * {@code DELETE  /forex-brokers/:id} : delete the "id" forexBroker.
     *
     * @param id the id of the forexBroker to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteForexBroker(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ForexBroker : {}", id);
        forexBrokerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
