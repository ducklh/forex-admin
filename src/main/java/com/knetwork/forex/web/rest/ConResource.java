package com.knetwork.forex.web.rest;

import com.knetwork.forex.domain.Con;
import com.knetwork.forex.repository.ConRepository;
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
 * REST controller for managing {@link com.knetwork.forex.domain.Con}.
 */
@RestController
@RequestMapping("/api/cons")
public class ConResource {

    private static final Logger LOG = LoggerFactory.getLogger(ConResource.class);

    private static final String ENTITY_NAME = "con";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConRepository conRepository;

    public ConResource(ConRepository conRepository) {
        this.conRepository = conRepository;
    }

    /**
     * {@code POST  /cons} : Create a new con.
     *
     * @param con the con to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new con, or with status {@code 400 (Bad Request)} if the con has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Con> createCon(@Valid @RequestBody Con con) throws URISyntaxException {
        LOG.debug("REST request to save Con : {}", con);
        if (con.getId() != null) {
            throw new BadRequestAlertException("A new con cannot already have an ID", ENTITY_NAME, "idexists");
        }
        con = conRepository.save(con);
        return ResponseEntity.created(new URI("/api/cons/" + con.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, con.getId()))
            .body(con);
    }

    /**
     * {@code PUT  /cons/:id} : Updates an existing con.
     *
     * @param id the id of the con to save.
     * @param con the con to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated con,
     * or with status {@code 400 (Bad Request)} if the con is not valid,
     * or with status {@code 500 (Internal Server Error)} if the con couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Con> updateCon(@PathVariable(value = "id", required = false) final String id, @Valid @RequestBody Con con)
        throws URISyntaxException {
        LOG.debug("REST request to update Con : {}, {}", id, con);
        if (con.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, con.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        con = conRepository.save(con);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, con.getId())).body(con);
    }

    /**
     * {@code PATCH  /cons/:id} : Partial updates given fields of an existing con, field will ignore if it is null
     *
     * @param id the id of the con to save.
     * @param con the con to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated con,
     * or with status {@code 400 (Bad Request)} if the con is not valid,
     * or with status {@code 404 (Not Found)} if the con is not found,
     * or with status {@code 500 (Internal Server Error)} if the con couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Con> partialUpdateCon(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Con con
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Con partially : {}, {}", id, con);
        if (con.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, con.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Con> result = conRepository
            .findById(con.getId())
            .map(existingCon -> {
                if (con.getText() != null) {
                    existingCon.setText(con.getText());
                }

                return existingCon;
            })
            .map(conRepository::save);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, con.getId()));
    }

    /**
     * {@code GET  /cons} : get all the cons.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cons in body.
     */
    @GetMapping("")
    public List<Con> getAllCons() {
        LOG.debug("REST request to get all Cons");
        return conRepository.findAll();
    }

    /**
     * {@code GET  /cons/:id} : get the "id" con.
     *
     * @param id the id of the con to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the con, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Con> getCon(@PathVariable("id") String id) {
        LOG.debug("REST request to get Con : {}", id);
        Optional<Con> con = conRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(con);
    }

    /**
     * {@code DELETE  /cons/:id} : delete the "id" con.
     *
     * @param id the id of the con to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCon(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Con : {}", id);
        conRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
