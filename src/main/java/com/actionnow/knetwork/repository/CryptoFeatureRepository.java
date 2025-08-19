package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.CryptoFeature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CryptoFeature entity.
 */
@Repository
public interface CryptoFeatureRepository extends MongoRepository<CryptoFeature, String> {}
