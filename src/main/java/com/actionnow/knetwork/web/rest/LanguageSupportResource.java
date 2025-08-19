package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.LanguageSupport;
import com.actionnow.knetwork.repository.LanguageSupportRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.LanguageSupport}.
 */
@RestController
@RequestMapping("/api/language-supports")
public class LanguageSupportResource {

    private static final Logger LOG = LoggerFactory.getLogger(LanguageSupportResource.class);

    private static final String ENTITY_NAME = "languageSupport";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LanguageSupportRepository languageSupportRepository;

    public LanguageSupportResource(LanguageSupportRepository languageSupportRepository) {
        this.languageSupportRepository = languageSupportRepository;
    }

    /**
     * {@code POST  /language-supports} : Create a new languageSupport.
     *
     * @param languageSupport the languageSupport to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new languageSupport, or with status {@code 400 (Bad Request)} if the languageSupport has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LanguageSupport> createLanguageSupport(@Valid @RequestBody LanguageSupport languageSupport)
        throws URISyntaxException {
        LOG.debug("REST request to save LanguageSupport : {}", languageSupport);
        if (languageSupport.getId() != null) {
            throw new BadRequestAlertException("A new languageSupport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        languageSupport = languageSupportRepository.save(languageSupport);
        return ResponseEntity.created(new URI("/api/language-supports/" + languageSupport.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, languageSupport.getId()))
            .body(languageSupport);
    }

    /**
     * {@code PUT  /language-supports/:id} : Updates an existing languageSupport.
     *
     * @param id the id of the languageSupport to save.
     * @param languageSupport the languageSupport to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated languageSupport,
     * or with status {@code 400 (Bad Request)} if the languageSupport is not valid,
     * or with status {@code 500 (Internal Server Error)} if the languageSupport couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LanguageSupport> updateLanguageSupport(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody LanguageSupport languageSupport
    ) throws URISyntaxException {
        LOG.debug("REST request to update LanguageSupport : {}, {}", id, languageSupport);
        if (languageSupport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, languageSupport.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!languageSupportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        languageSupport = languageSupportRepository.save(languageSupport);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, languageSupport.getId()))
            .body(languageSupport);
    }

    /**
     * {@code PATCH  /language-supports/:id} : Partial updates given fields of an existing languageSupport, field will ignore if it is null
     *
     * @param id the id of the languageSupport to save.
     * @param languageSupport the languageSupport to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated languageSupport,
     * or with status {@code 400 (Bad Request)} if the languageSupport is not valid,
     * or with status {@code 404 (Not Found)} if the languageSupport is not found,
     * or with status {@code 500 (Internal Server Error)} if the languageSupport couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LanguageSupport> partialUpdateLanguageSupport(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody LanguageSupport languageSupport
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LanguageSupport partially : {}, {}", id, languageSupport);
        if (languageSupport.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, languageSupport.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!languageSupportRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LanguageSupport> result = languageSupportRepository
            .findById(languageSupport.getId())
            .map(existingLanguageSupport -> {
                if (languageSupport.getValue() != null) {
                    existingLanguageSupport.setValue(languageSupport.getValue());
                }
                if (languageSupport.getValueEn() != null) {
                    existingLanguageSupport.setValueEn(languageSupport.getValueEn());
                }

                return existingLanguageSupport;
            })
            .map(languageSupportRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, languageSupport.getId())
        );
    }

    /**
     * {@code GET  /language-supports} : get all the languageSupports.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of languageSupports in body.
     */
    @GetMapping("")
    public List<LanguageSupport> getAllLanguageSupports() {
        LOG.debug("REST request to get all LanguageSupports");
        return languageSupportRepository.findAll();
    }

    /**
     * {@code GET  /language-supports/:id} : get the "id" languageSupport.
     *
     * @param id the id of the languageSupport to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the languageSupport, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LanguageSupport> getLanguageSupport(@PathVariable("id") String id) {
        LOG.debug("REST request to get LanguageSupport : {}", id);
        Optional<LanguageSupport> languageSupport = languageSupportRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(languageSupport);
    }

    /**
     * {@code DELETE  /language-supports/:id} : delete the "id" languageSupport.
     *
     * @param id the id of the languageSupport to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLanguageSupport(@PathVariable("id") String id) {
        LOG.debug("REST request to delete LanguageSupport : {}", id);
        languageSupportRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
