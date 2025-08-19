package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.Feature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Feature entity.
 */
@Repository
public interface FeatureRepository extends MongoRepository<Feature, String> {}
