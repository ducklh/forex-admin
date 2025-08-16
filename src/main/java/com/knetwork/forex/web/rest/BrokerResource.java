package com.knetwork.forex.web.rest;

import com.knetwork.forex.domain.Broker;
import com.knetwork.forex.repository.BrokerRepository;
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
 * REST controller for managing {@link com.knetwork.forex.domain.Broker}.
 */
@RestController
@RequestMapping("/api/brokers")
public class BrokerResource {

    private static final Logger LOG = LoggerFactory.getLogger(BrokerResource.class);

    private static final String ENTITY_NAME = "broker";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BrokerRepository brokerRepository;

    public BrokerResource(BrokerRepository brokerRepository) {
        this.brokerRepository = brokerRepository;
    }

    /**
     * {@code POST  /brokers} : Create a new broker.
     *
     * @param broker the broker to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new broker, or with status {@code 400 (Bad Request)} if the broker has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Broker> createBroker(@Valid @RequestBody Broker broker) throws URISyntaxException {
        LOG.debug("REST request to save Broker : {}", broker);
        if (broker.getId() != null) {
            throw new BadRequestAlertException("A new broker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        broker = brokerRepository.save(broker);
        return ResponseEntity.created(new URI("/api/brokers/" + broker.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, broker.getId()))
            .body(broker);
    }

    /**
     * {@code PUT  /brokers/:id} : Updates an existing broker.
     *
     * @param id the id of the broker to save.
     * @param broker the broker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated broker,
     * or with status {@code 400 (Bad Request)} if the broker is not valid,
     * or with status {@code 500 (Internal Server Error)} if the broker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Broker> updateBroker(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Broker broker
    ) throws URISyntaxException {
        LOG.debug("REST request to update Broker : {}, {}", id, broker);
        if (broker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, broker.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!brokerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        broker = brokerRepository.save(broker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, broker.getId()))
            .body(broker);
    }

    /**
     * {@code PATCH  /brokers/:id} : Partial updates given fields of an existing broker, field will ignore if it is null
     *
     * @param id the id of the broker to save.
     * @param broker the broker to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated broker,
     * or with status {@code 400 (Bad Request)} if the broker is not valid,
     * or with status {@code 404 (Not Found)} if the broker is not found,
     * or with status {@code 500 (Internal Server Error)} if the broker couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Broker> partialUpdateBroker(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Broker broker
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Broker partially : {}, {}", id, broker);
        if (broker.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, broker.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!brokerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Broker> result = brokerRepository
            .findById(broker.getId())
            .map(existingBroker -> {
                if (broker.getName() != null) {
                    existingBroker.setName(broker.getName());
                }
                if (broker.getLogo() != null) {
                    existingBroker.setLogo(broker.getLogo());
                }
                if (broker.getUrl() != null) {
                    existingBroker.setUrl(broker.getUrl());
                }
                if (broker.getDescription() != null) {
                    existingBroker.setDescription(broker.getDescription());
                }
                if (broker.getRating() != null) {
                    existingBroker.setRating(broker.getRating());
                }
                if (broker.getMinDeposit() != null) {
                    existingBroker.setMinDeposit(broker.getMinDeposit());
                }
                if (broker.getSpreads() != null) {
                    existingBroker.setSpreads(broker.getSpreads());
                }
                if (broker.getLeverage() != null) {
                    existingBroker.setLeverage(broker.getLeverage());
                }
                if (broker.getFounded() != null) {
                    existingBroker.setFounded(broker.getFounded());
                }
                if (broker.getHeadquarters() != null) {
                    existingBroker.setHeadquarters(broker.getHeadquarters());
                }

                return existingBroker;
            })
            .map(brokerRepository::save);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, broker.getId()));
    }

    /**
     * {@code GET  /brokers} : get all the brokers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of brokers in body.
     */
    @GetMapping("")
    public List<Broker> getAllBrokers() {
        LOG.debug("REST request to get all Brokers");
        return brokerRepository.findAll();
    }

    /**
     * {@code GET  /brokers/:id} : get the "id" broker.
     *
     * @param id the id of the broker to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the broker, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Broker> getBroker(@PathVariable("id") String id) {
        LOG.debug("REST request to get Broker : {}", id);
        Optional<Broker> broker = brokerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(broker);
    }

    /**
     * {@code DELETE  /brokers/:id} : delete the "id" broker.
     *
     * @param id the id of the broker to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBroker(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Broker : {}", id);
        brokerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
