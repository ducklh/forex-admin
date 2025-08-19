package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.Instrument;
import com.actionnow.knetwork.repository.InstrumentRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.Instrument}.
 */
@RestController
@RequestMapping("/api/instruments")
public class InstrumentResource {

    private static final Logger LOG = LoggerFactory.getLogger(InstrumentResource.class);

    private static final String ENTITY_NAME = "instrument";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InstrumentRepository instrumentRepository;

    public InstrumentResource(InstrumentRepository instrumentRepository) {
        this.instrumentRepository = instrumentRepository;
    }

    /**
     * {@code POST  /instruments} : Create a new instrument.
     *
     * @param instrument the instrument to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new instrument, or with status {@code 400 (Bad Request)} if the instrument has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Instrument> createInstrument(@Valid @RequestBody Instrument instrument) throws URISyntaxException {
        LOG.debug("REST request to save Instrument : {}", instrument);
        if (instrument.getId() != null) {
            throw new BadRequestAlertException("A new instrument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        instrument = instrumentRepository.save(instrument);
        return ResponseEntity.created(new URI("/api/instruments/" + instrument.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, instrument.getId()))
            .body(instrument);
    }

    /**
     * {@code PUT  /instruments/:id} : Updates an existing instrument.
     *
     * @param id the id of the instrument to save.
     * @param instrument the instrument to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated instrument,
     * or with status {@code 400 (Bad Request)} if the instrument is not valid,
     * or with status {@code 500 (Internal Server Error)} if the instrument couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Instrument> updateInstrument(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Instrument instrument
    ) throws URISyntaxException {
        LOG.debug("REST request to update Instrument : {}, {}", id, instrument);
        if (instrument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, instrument.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!instrumentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        instrument = instrumentRepository.save(instrument);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, instrument.getId()))
            .body(instrument);
    }

    /**
     * {@code PATCH  /instruments/:id} : Partial updates given fields of an existing instrument, field will ignore if it is null
     *
     * @param id the id of the instrument to save.
     * @param instrument the instrument to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated instrument,
     * or with status {@code 400 (Bad Request)} if the instrument is not valid,
     * or with status {@code 404 (Not Found)} if the instrument is not found,
     * or with status {@code 500 (Internal Server Error)} if the instrument couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Instrument> partialUpdateInstrument(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Instrument instrument
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Instrument partially : {}, {}", id, instrument);
        if (instrument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, instrument.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!instrumentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Instrument> result = instrumentRepository
            .findById(instrument.getId())
            .map(existingInstrument -> {
                if (instrument.getValue() != null) {
                    existingInstrument.setValue(instrument.getValue());
                }
                if (instrument.getValueEn() != null) {
                    existingInstrument.setValueEn(instrument.getValueEn());
                }

                return existingInstrument;
            })
            .map(instrumentRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, instrument.getId())
        );
    }

    /**
     * {@code GET  /instruments} : get all the instruments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of instruments in body.
     */
    @GetMapping("")
    public List<Instrument> getAllInstruments() {
        LOG.debug("REST request to get all Instruments");
        return instrumentRepository.findAll();
    }

    /**
     * {@code GET  /instruments/:id} : get the "id" instrument.
     *
     * @param id the id of the instrument to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the instrument, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Instrument> getInstrument(@PathVariable("id") String id) {
        LOG.debug("REST request to get Instrument : {}", id);
        Optional<Instrument> instrument = instrumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(instrument);
    }

    /**
     * {@code DELETE  /instruments/:id} : delete the "id" instrument.
     *
     * @param id the id of the instrument to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstrument(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Instrument : {}", id);
        instrumentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
