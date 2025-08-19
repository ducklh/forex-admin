package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.Pro;
import com.actionnow.knetwork.repository.ProRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.Pro}.
 */
@RestController
@RequestMapping("/api/pros")
public class ProResource {

    private static final Logger LOG = LoggerFactory.getLogger(ProResource.class);

    private static final String ENTITY_NAME = "pro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProRepository proRepository;

    public ProResource(ProRepository proRepository) {
        this.proRepository = proRepository;
    }

    /**
     * {@code POST  /pros} : Create a new pro.
     *
     * @param pro the pro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pro, or with status {@code 400 (Bad Request)} if the pro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Pro> createPro(@Valid @RequestBody Pro pro) throws URISyntaxException {
        LOG.debug("REST request to save Pro : {}", pro);
        if (pro.getId() != null) {
            throw new BadRequestAlertException("A new pro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        pro = proRepository.save(pro);
        return ResponseEntity.created(new URI("/api/pros/" + pro.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, pro.getId()))
            .body(pro);
    }

    /**
     * {@code PUT  /pros/:id} : Updates an existing pro.
     *
     * @param id the id of the pro to save.
     * @param pro the pro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pro,
     * or with status {@code 400 (Bad Request)} if the pro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Pro> updatePro(@PathVariable(value = "id", required = false) final String id, @Valid @RequestBody Pro pro)
        throws URISyntaxException {
        LOG.debug("REST request to update Pro : {}, {}", id, pro);
        if (pro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        pro = proRepository.save(pro);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pro.getId())).body(pro);
    }

    /**
     * {@code PATCH  /pros/:id} : Partial updates given fields of an existing pro, field will ignore if it is null
     *
     * @param id the id of the pro to save.
     * @param pro the pro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pro,
     * or with status {@code 400 (Bad Request)} if the pro is not valid,
     * or with status {@code 404 (Not Found)} if the pro is not found,
     * or with status {@code 500 (Internal Server Error)} if the pro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pro> partialUpdatePro(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Pro pro
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Pro partially : {}, {}", id, pro);
        if (pro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pro.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pro> result = proRepository
            .findById(pro.getId())
            .map(existingPro -> {
                if (pro.getValue() != null) {
                    existingPro.setValue(pro.getValue());
                }
                if (pro.getValueEn() != null) {
                    existingPro.setValueEn(pro.getValueEn());
                }

                return existingPro;
            })
            .map(proRepository::save);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pro.getId()));
    }

    /**
     * {@code GET  /pros} : get all the pros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pros in body.
     */
    @GetMapping("")
    public List<Pro> getAllPros() {
        LOG.debug("REST request to get all Pros");
        return proRepository.findAll();
    }

    /**
     * {@code GET  /pros/:id} : get the "id" pro.
     *
     * @param id the id of the pro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Pro> getPro(@PathVariable("id") String id) {
        LOG.debug("REST request to get Pro : {}", id);
        Optional<Pro> pro = proRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pro);
    }

    /**
     * {@code DELETE  /pros/:id} : delete the "id" pro.
     *
     * @param id the id of the pro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePro(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Pro : {}", id);
        proRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
