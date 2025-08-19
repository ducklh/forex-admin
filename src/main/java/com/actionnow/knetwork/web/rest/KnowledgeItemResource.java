package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.KnowledgeItem;
import com.actionnow.knetwork.repository.KnowledgeItemRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.KnowledgeItem}.
 */
@RestController
@RequestMapping("/api/knowledge-items")
public class KnowledgeItemResource {

    private static final Logger LOG = LoggerFactory.getLogger(KnowledgeItemResource.class);

    private static final String ENTITY_NAME = "knowledgeItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KnowledgeItemRepository knowledgeItemRepository;

    public KnowledgeItemResource(KnowledgeItemRepository knowledgeItemRepository) {
        this.knowledgeItemRepository = knowledgeItemRepository;
    }

    /**
     * {@code POST  /knowledge-items} : Create a new knowledgeItem.
     *
     * @param knowledgeItem the knowledgeItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new knowledgeItem, or with status {@code 400 (Bad Request)} if the knowledgeItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<KnowledgeItem> createKnowledgeItem(@Valid @RequestBody KnowledgeItem knowledgeItem) throws URISyntaxException {
        LOG.debug("REST request to save KnowledgeItem : {}", knowledgeItem);
        if (knowledgeItem.getId() != null) {
            throw new BadRequestAlertException("A new knowledgeItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        knowledgeItem = knowledgeItemRepository.save(knowledgeItem);
        return ResponseEntity.created(new URI("/api/knowledge-items/" + knowledgeItem.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, knowledgeItem.getId()))
            .body(knowledgeItem);
    }

    /**
     * {@code PUT  /knowledge-items/:id} : Updates an existing knowledgeItem.
     *
     * @param id the id of the knowledgeItem to save.
     * @param knowledgeItem the knowledgeItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated knowledgeItem,
     * or with status {@code 400 (Bad Request)} if the knowledgeItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the knowledgeItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<KnowledgeItem> updateKnowledgeItem(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody KnowledgeItem knowledgeItem
    ) throws URISyntaxException {
        LOG.debug("REST request to update KnowledgeItem : {}, {}", id, knowledgeItem);
        if (knowledgeItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, knowledgeItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!knowledgeItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        knowledgeItem = knowledgeItemRepository.save(knowledgeItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, knowledgeItem.getId()))
            .body(knowledgeItem);
    }

    /**
     * {@code PATCH  /knowledge-items/:id} : Partial updates given fields of an existing knowledgeItem, field will ignore if it is null
     *
     * @param id the id of the knowledgeItem to save.
     * @param knowledgeItem the knowledgeItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated knowledgeItem,
     * or with status {@code 400 (Bad Request)} if the knowledgeItem is not valid,
     * or with status {@code 404 (Not Found)} if the knowledgeItem is not found,
     * or with status {@code 500 (Internal Server Error)} if the knowledgeItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<KnowledgeItem> partialUpdateKnowledgeItem(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody KnowledgeItem knowledgeItem
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update KnowledgeItem partially : {}, {}", id, knowledgeItem);
        if (knowledgeItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, knowledgeItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!knowledgeItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<KnowledgeItem> result = knowledgeItemRepository
            .findById(knowledgeItem.getId())
            .map(existingKnowledgeItem -> {
                if (knowledgeItem.getTitle() != null) {
                    existingKnowledgeItem.setTitle(knowledgeItem.getTitle());
                }
                if (knowledgeItem.getTitleEn() != null) {
                    existingKnowledgeItem.setTitleEn(knowledgeItem.getTitleEn());
                }
                if (knowledgeItem.getExcerpt() != null) {
                    existingKnowledgeItem.setExcerpt(knowledgeItem.getExcerpt());
                }
                if (knowledgeItem.getExcerptEn() != null) {
                    existingKnowledgeItem.setExcerptEn(knowledgeItem.getExcerptEn());
                }
                if (knowledgeItem.getContent() != null) {
                    existingKnowledgeItem.setContent(knowledgeItem.getContent());
                }
                if (knowledgeItem.getContentEn() != null) {
                    existingKnowledgeItem.setContentEn(knowledgeItem.getContentEn());
                }
                if (knowledgeItem.getCategory() != null) {
                    existingKnowledgeItem.setCategory(knowledgeItem.getCategory());
                }
                if (knowledgeItem.getCategoryEn() != null) {
                    existingKnowledgeItem.setCategoryEn(knowledgeItem.getCategoryEn());
                }
                if (knowledgeItem.getLevel() != null) {
                    existingKnowledgeItem.setLevel(knowledgeItem.getLevel());
                }
                if (knowledgeItem.getLevelEn() != null) {
                    existingKnowledgeItem.setLevelEn(knowledgeItem.getLevelEn());
                }
                if (knowledgeItem.getAuthor() != null) {
                    existingKnowledgeItem.setAuthor(knowledgeItem.getAuthor());
                }
                if (knowledgeItem.getPublishedAt() != null) {
                    existingKnowledgeItem.setPublishedAt(knowledgeItem.getPublishedAt());
                }
                if (knowledgeItem.getReadTime() != null) {
                    existingKnowledgeItem.setReadTime(knowledgeItem.getReadTime());
                }
                if (knowledgeItem.getImage() != null) {
                    existingKnowledgeItem.setImage(knowledgeItem.getImage());
                }

                return existingKnowledgeItem;
            })
            .map(knowledgeItemRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, knowledgeItem.getId())
        );
    }

    /**
     * {@code GET  /knowledge-items} : get all the knowledgeItems.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of knowledgeItems in body.
     */
    @GetMapping("")
    public List<KnowledgeItem> getAllKnowledgeItems(
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get all KnowledgeItems");
        if (eagerload) {
            return knowledgeItemRepository.findAllWithEagerRelationships();
        } else {
            return knowledgeItemRepository.findAll();
        }
    }

    /**
     * {@code GET  /knowledge-items/:id} : get the "id" knowledgeItem.
     *
     * @param id the id of the knowledgeItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the knowledgeItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<KnowledgeItem> getKnowledgeItem(@PathVariable("id") String id) {
        LOG.debug("REST request to get KnowledgeItem : {}", id);
        Optional<KnowledgeItem> knowledgeItem = knowledgeItemRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(knowledgeItem);
    }

    /**
     * {@code DELETE  /knowledge-items/:id} : delete the "id" knowledgeItem.
     *
     * @param id the id of the knowledgeItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKnowledgeItem(@PathVariable("id") String id) {
        LOG.debug("REST request to delete KnowledgeItem : {}", id);
        knowledgeItemRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
