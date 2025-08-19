package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.SiteNewsArticle;
import com.actionnow.knetwork.repository.SiteNewsArticleRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.SiteNewsArticle}.
 */
@RestController
@RequestMapping("/api/site-news-articles")
public class SiteNewsArticleResource {

    private static final Logger LOG = LoggerFactory.getLogger(SiteNewsArticleResource.class);

    private static final String ENTITY_NAME = "siteNewsArticle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SiteNewsArticleRepository siteNewsArticleRepository;

    public SiteNewsArticleResource(SiteNewsArticleRepository siteNewsArticleRepository) {
        this.siteNewsArticleRepository = siteNewsArticleRepository;
    }

    /**
     * {@code POST  /site-news-articles} : Create a new siteNewsArticle.
     *
     * @param siteNewsArticle the siteNewsArticle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new siteNewsArticle, or with status {@code 400 (Bad Request)} if the siteNewsArticle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SiteNewsArticle> createSiteNewsArticle(@Valid @RequestBody SiteNewsArticle siteNewsArticle)
        throws URISyntaxException {
        LOG.debug("REST request to save SiteNewsArticle : {}", siteNewsArticle);
        if (siteNewsArticle.getId() != null) {
            throw new BadRequestAlertException("A new siteNewsArticle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        siteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);
        return ResponseEntity.created(new URI("/api/site-news-articles/" + siteNewsArticle.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, siteNewsArticle.getId()))
            .body(siteNewsArticle);
    }

    /**
     * {@code PUT  /site-news-articles/:id} : Updates an existing siteNewsArticle.
     *
     * @param id the id of the siteNewsArticle to save.
     * @param siteNewsArticle the siteNewsArticle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated siteNewsArticle,
     * or with status {@code 400 (Bad Request)} if the siteNewsArticle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the siteNewsArticle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SiteNewsArticle> updateSiteNewsArticle(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody SiteNewsArticle siteNewsArticle
    ) throws URISyntaxException {
        LOG.debug("REST request to update SiteNewsArticle : {}, {}", id, siteNewsArticle);
        if (siteNewsArticle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, siteNewsArticle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!siteNewsArticleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        siteNewsArticle = siteNewsArticleRepository.save(siteNewsArticle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, siteNewsArticle.getId()))
            .body(siteNewsArticle);
    }

    /**
     * {@code PATCH  /site-news-articles/:id} : Partial updates given fields of an existing siteNewsArticle, field will ignore if it is null
     *
     * @param id the id of the siteNewsArticle to save.
     * @param siteNewsArticle the siteNewsArticle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated siteNewsArticle,
     * or with status {@code 400 (Bad Request)} if the siteNewsArticle is not valid,
     * or with status {@code 404 (Not Found)} if the siteNewsArticle is not found,
     * or with status {@code 500 (Internal Server Error)} if the siteNewsArticle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SiteNewsArticle> partialUpdateSiteNewsArticle(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody SiteNewsArticle siteNewsArticle
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update SiteNewsArticle partially : {}, {}", id, siteNewsArticle);
        if (siteNewsArticle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, siteNewsArticle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!siteNewsArticleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SiteNewsArticle> result = siteNewsArticleRepository
            .findById(siteNewsArticle.getId())
            .map(existingSiteNewsArticle -> {
                if (siteNewsArticle.getTitle() != null) {
                    existingSiteNewsArticle.setTitle(siteNewsArticle.getTitle());
                }
                if (siteNewsArticle.getTitleEn() != null) {
                    existingSiteNewsArticle.setTitleEn(siteNewsArticle.getTitleEn());
                }
                if (siteNewsArticle.getExcerpt() != null) {
                    existingSiteNewsArticle.setExcerpt(siteNewsArticle.getExcerpt());
                }
                if (siteNewsArticle.getExcerptEn() != null) {
                    existingSiteNewsArticle.setExcerptEn(siteNewsArticle.getExcerptEn());
                }
                if (siteNewsArticle.getContent() != null) {
                    existingSiteNewsArticle.setContent(siteNewsArticle.getContent());
                }
                if (siteNewsArticle.getContentEn() != null) {
                    existingSiteNewsArticle.setContentEn(siteNewsArticle.getContentEn());
                }
                if (siteNewsArticle.getCategory() != null) {
                    existingSiteNewsArticle.setCategory(siteNewsArticle.getCategory());
                }
                if (siteNewsArticle.getCategoryEn() != null) {
                    existingSiteNewsArticle.setCategoryEn(siteNewsArticle.getCategoryEn());
                }
                if (siteNewsArticle.getAuthor() != null) {
                    existingSiteNewsArticle.setAuthor(siteNewsArticle.getAuthor());
                }
                if (siteNewsArticle.getPublishedAt() != null) {
                    existingSiteNewsArticle.setPublishedAt(siteNewsArticle.getPublishedAt());
                }
                if (siteNewsArticle.getReadTime() != null) {
                    existingSiteNewsArticle.setReadTime(siteNewsArticle.getReadTime());
                }
                if (siteNewsArticle.getImage() != null) {
                    existingSiteNewsArticle.setImage(siteNewsArticle.getImage());
                }
                if (siteNewsArticle.getFullContent() != null) {
                    existingSiteNewsArticle.setFullContent(siteNewsArticle.getFullContent());
                }
                if (siteNewsArticle.getFullContentEn() != null) {
                    existingSiteNewsArticle.setFullContentEn(siteNewsArticle.getFullContentEn());
                }

                return existingSiteNewsArticle;
            })
            .map(siteNewsArticleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, siteNewsArticle.getId())
        );
    }

    /**
     * {@code GET  /site-news-articles} : get all the siteNewsArticles.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of siteNewsArticles in body.
     */
    @GetMapping("")
    public List<SiteNewsArticle> getAllSiteNewsArticles(
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get all SiteNewsArticles");
        if (eagerload) {
            return siteNewsArticleRepository.findAllWithEagerRelationships();
        } else {
            return siteNewsArticleRepository.findAll();
        }
    }

    /**
     * {@code GET  /site-news-articles/:id} : get the "id" siteNewsArticle.
     *
     * @param id the id of the siteNewsArticle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the siteNewsArticle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SiteNewsArticle> getSiteNewsArticle(@PathVariable("id") String id) {
        LOG.debug("REST request to get SiteNewsArticle : {}", id);
        Optional<SiteNewsArticle> siteNewsArticle = siteNewsArticleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(siteNewsArticle);
    }

    /**
     * {@code DELETE  /site-news-articles/:id} : delete the "id" siteNewsArticle.
     *
     * @param id the id of the siteNewsArticle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSiteNewsArticle(@PathVariable("id") String id) {
        LOG.debug("REST request to delete SiteNewsArticle : {}", id);
        siteNewsArticleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
