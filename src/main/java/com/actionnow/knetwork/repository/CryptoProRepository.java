package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.CryptoPro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CryptoPro entity.
 */
@Repository
public interface CryptoProRepository extends MongoRepository<CryptoPro, String> {}
