package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.Platform;
import com.actionnow.knetwork.repository.PlatformRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.Platform}.
 */
@RestController
@RequestMapping("/api/platforms")
public class PlatformResource {

    private static final Logger LOG = LoggerFactory.getLogger(PlatformResource.class);

    private static final String ENTITY_NAME = "platform";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlatformRepository platformRepository;

    public PlatformResource(PlatformRepository platformRepository) {
        this.platformRepository = platformRepository;
    }

    /**
     * {@code POST  /platforms} : Create a new platform.
     *
     * @param platform the platform to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new platform, or with status {@code 400 (Bad Request)} if the platform has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Platform> createPlatform(@Valid @RequestBody Platform platform) throws URISyntaxException {
        LOG.debug("REST request to save Platform : {}", platform);
        if (platform.getId() != null) {
            throw new BadRequestAlertException("A new platform cannot already have an ID", ENTITY_NAME, "idexists");
        }
        platform = platformRepository.save(platform);
        return ResponseEntity.created(new URI("/api/platforms/" + platform.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, platform.getId()))
            .body(platform);
    }

    /**
     * {@code PUT  /platforms/:id} : Updates an existing platform.
     *
     * @param id the id of the platform to save.
     * @param platform the platform to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated platform,
     * or with status {@code 400 (Bad Request)} if the platform is not valid,
     * or with status {@code 500 (Internal Server Error)} if the platform couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Platform> updatePlatform(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Platform platform
    ) throws URISyntaxException {
        LOG.debug("REST request to update Platform : {}, {}", id, platform);
        if (platform.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, platform.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!platformRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        platform = platformRepository.save(platform);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, platform.getId()))
            .body(platform);
    }

    /**
     * {@code PATCH  /platforms/:id} : Partial updates given fields of an existing platform, field will ignore if it is null
     *
     * @param id the id of the platform to save.
     * @param platform the platform to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated platform,
     * or with status {@code 400 (Bad Request)} if the platform is not valid,
     * or with status {@code 404 (Not Found)} if the platform is not found,
     * or with status {@code 500 (Internal Server Error)} if the platform couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Platform> partialUpdatePlatform(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Platform platform
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Platform partially : {}, {}", id, platform);
        if (platform.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, platform.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!platformRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Platform> result = platformRepository
            .findById(platform.getId())
            .map(existingPlatform -> {
                if (platform.getValue() != null) {
                    existingPlatform.setValue(platform.getValue());
                }
                if (platform.getValueEn() != null) {
                    existingPlatform.setValueEn(platform.getValueEn());
                }

                return existingPlatform;
            })
            .map(platformRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, platform.getId())
        );
    }

    /**
     * {@code GET  /platforms} : get all the platforms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of platforms in body.
     */
    @GetMapping("")
    public List<Platform> getAllPlatforms() {
        LOG.debug("REST request to get all Platforms");
        return platformRepository.findAll();
    }

    /**
     * {@code GET  /platforms/:id} : get the "id" platform.
     *
     * @param id the id of the platform to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the platform, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Platform> getPlatform(@PathVariable("id") String id) {
        LOG.debug("REST request to get Platform : {}", id);
        Optional<Platform> platform = platformRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(platform);
    }

    /**
     * {@code DELETE  /platforms/:id} : delete the "id" platform.
     *
     * @param id the id of the platform to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlatform(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Platform : {}", id);
        platformRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
