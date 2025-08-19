package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.Coin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Coin entity.
 */
@Repository
public interface CoinRepository extends MongoRepository<Coin, String> {}
