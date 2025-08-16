package com.knetwork.forex.web.rest;

import com.knetwork.forex.domain.Regulation;
import com.knetwork.forex.repository.RegulationRepository;
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
 * REST controller for managing {@link com.knetwork.forex.domain.Regulation}.
 */
@RestController
@RequestMapping("/api/regulations")
public class RegulationResource {

    private static final Logger LOG = LoggerFactory.getLogger(RegulationResource.class);

    private static final String ENTITY_NAME = "regulation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RegulationRepository regulationRepository;

    public RegulationResource(RegulationRepository regulationRepository) {
        this.regulationRepository = regulationRepository;
    }

    /**
     * {@code POST  /regulations} : Create a new regulation.
     *
     * @param regulation the regulation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new regulation, or with status {@code 400 (Bad Request)} if the regulation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Regulation> createRegulation(@Valid @RequestBody Regulation regulation) throws URISyntaxException {
        LOG.debug("REST request to save Regulation : {}", regulation);
        if (regulation.getId() != null) {
            throw new BadRequestAlertException("A new regulation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        regulation = regulationRepository.save(regulation);
        return ResponseEntity.created(new URI("/api/regulations/" + regulation.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, regulation.getId()))
            .body(regulation);
    }

    /**
     * {@code PUT  /regulations/:id} : Updates an existing regulation.
     *
     * @param id the id of the regulation to save.
     * @param regulation the regulation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regulation,
     * or with status {@code 400 (Bad Request)} if the regulation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the regulation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Regulation> updateRegulation(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Regulation regulation
    ) throws URISyntaxException {
        LOG.debug("REST request to update Regulation : {}, {}", id, regulation);
        if (regulation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, regulation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!regulationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        regulation = regulationRepository.save(regulation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, regulation.getId()))
            .body(regulation);
    }

    /**
     * {@code PATCH  /regulations/:id} : Partial updates given fields of an existing regulation, field will ignore if it is null
     *
     * @param id the id of the regulation to save.
     * @param regulation the regulation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regulation,
     * or with status {@code 400 (Bad Request)} if the regulation is not valid,
     * or with status {@code 404 (Not Found)} if the regulation is not found,
     * or with status {@code 500 (Internal Server Error)} if the regulation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Regulation> partialUpdateRegulation(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Regulation regulation
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Regulation partially : {}, {}", id, regulation);
        if (regulation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, regulation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!regulationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Regulation> result = regulationRepository
            .findById(regulation.getId())
            .map(existingRegulation -> {
                if (regulation.getAuthority() != null) {
                    existingRegulation.setAuthority(regulation.getAuthority());
                }

                return existingRegulation;
            })
            .map(regulationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, regulation.getId())
        );
    }

    /**
     * {@code GET  /regulations} : get all the regulations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of regulations in body.
     */
    @GetMapping("")
    public List<Regulation> getAllRegulations() {
        LOG.debug("REST request to get all Regulations");
        return regulationRepository.findAll();
    }

    /**
     * {@code GET  /regulations/:id} : get the "id" regulation.
     *
     * @param id the id of the regulation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the regulation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Regulation> getRegulation(@PathVariable("id") String id) {
        LOG.debug("REST request to get Regulation : {}", id);
        Optional<Regulation> regulation = regulationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(regulation);
    }

    /**
     * {@code DELETE  /regulations/:id} : delete the "id" regulation.
     *
     * @param id the id of the regulation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegulation(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Regulation : {}", id);
        regulationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
