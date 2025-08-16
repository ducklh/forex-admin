package com.knetwork.forex.repository;

import com.knetwork.forex.domain.Feature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Feature entity.
 */
@Repository
public interface FeatureRepository extends MongoRepository<Feature, String> {}
