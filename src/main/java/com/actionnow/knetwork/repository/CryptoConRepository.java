package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.CryptoCon;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CryptoCon entity.
 */
@Repository
public interface CryptoConRepository extends MongoRepository<CryptoCon, String> {}
