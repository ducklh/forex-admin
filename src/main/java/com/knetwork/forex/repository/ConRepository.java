package com.knetwork.forex.repository;

import com.knetwork.forex.domain.Con;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Con entity.
 */
@Repository
public interface ConRepository extends MongoRepository<Con, String> {}
