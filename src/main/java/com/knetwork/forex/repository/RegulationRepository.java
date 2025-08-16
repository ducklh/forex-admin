package com.knetwork.forex.repository;

import com.knetwork.forex.domain.Regulation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Regulation entity.
 */
@Repository
public interface RegulationRepository extends MongoRepository<Regulation, String> {}
