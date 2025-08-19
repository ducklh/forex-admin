package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.Platform;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Platform entity.
 */
@Repository
public interface PlatformRepository extends MongoRepository<Platform, String> {}
