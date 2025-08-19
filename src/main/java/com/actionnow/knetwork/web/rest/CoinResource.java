package com.actionnow.knetwork.web.rest;

import com.actionnow.knetwork.domain.Coin;
import com.actionnow.knetwork.repository.CoinRepository;
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
 * REST controller for managing {@link com.actionnow.knetwork.domain.Coin}.
 */
@RestController
@RequestMapping("/api/coins")
public class CoinResource {

    private static final Logger LOG = LoggerFactory.getLogger(CoinResource.class);

    private static final String ENTITY_NAME = "coin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoinRepository coinRepository;

    public CoinResource(CoinRepository coinRepository) {
        this.coinRepository = coinRepository;
    }

    /**
     * {@code POST  /coins} : Create a new coin.
     *
     * @param coin the coin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coin, or with status {@code 400 (Bad Request)} if the coin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Coin> createCoin(@Valid @RequestBody Coin coin) throws URISyntaxException {
        LOG.debug("REST request to save Coin : {}", coin);
        if (coin.getId() != null) {
            throw new BadRequestAlertException("A new coin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        coin = coinRepository.save(coin);
        return ResponseEntity.created(new URI("/api/coins/" + coin.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, coin.getId()))
            .body(coin);
    }

    /**
     * {@code PUT  /coins/:id} : Updates an existing coin.
     *
     * @param id the id of the coin to save.
     * @param coin the coin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coin,
     * or with status {@code 400 (Bad Request)} if the coin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Coin> updateCoin(@PathVariable(value = "id", required = false) final String id, @Valid @RequestBody Coin coin)
        throws URISyntaxException {
        LOG.debug("REST request to update Coin : {}, {}", id, coin);
        if (coin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, coin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!coinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        coin = coinRepository.save(coin);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coin.getId())).body(coin);
    }

    /**
     * {@code PATCH  /coins/:id} : Partial updates given fields of an existing coin, field will ignore if it is null
     *
     * @param id the id of the coin to save.
     * @param coin the coin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coin,
     * or with status {@code 400 (Bad Request)} if the coin is not valid,
     * or with status {@code 404 (Not Found)} if the coin is not found,
     * or with status {@code 500 (Internal Server Error)} if the coin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Coin> partialUpdateCoin(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Coin coin
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Coin partially : {}, {}", id, coin);
        if (coin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, coin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!coinRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Coin> result = coinRepository
            .findById(coin.getId())
            .map(existingCoin -> {
                if (coin.getValue() != null) {
                    existingCoin.setValue(coin.getValue());
                }
                if (coin.getValueEn() != null) {
                    existingCoin.setValueEn(coin.getValueEn());
                }

                return existingCoin;
            })
            .map(coinRepository::save);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coin.getId()));
    }

    /**
     * {@code GET  /coins} : get all the coins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of coins in body.
     */
    @GetMapping("")
    public List<Coin> getAllCoins() {
        LOG.debug("REST request to get all Coins");
        return coinRepository.findAll();
    }

    /**
     * {@code GET  /coins/:id} : get the "id" coin.
     *
     * @param id the id of the coin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Coin> getCoin(@PathVariable("id") String id) {
        LOG.debug("REST request to get Coin : {}", id);
        Optional<Coin> coin = coinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coin);
    }

    /**
     * {@code DELETE  /coins/:id} : delete the "id" coin.
     *
     * @param id the id of the coin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoin(@PathVariable("id") String id) {
        LOG.debug("REST request to delete Coin : {}", id);
        coinRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
