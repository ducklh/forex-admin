package com.knetwork.forex.repository;

import com.knetwork.forex.domain.Support;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Support entity.
 */
@Repository
public interface SupportRepository extends MongoRepository<Support, String> {}
