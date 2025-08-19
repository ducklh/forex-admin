package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.SecurityFeature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SecurityFeature entity.
 */
@Repository
public interface SecurityFeatureRepository extends MongoRepository<SecurityFeature, String> {}
