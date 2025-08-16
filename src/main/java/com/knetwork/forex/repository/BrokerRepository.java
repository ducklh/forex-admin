package com.knetwork.forex.repository;

import com.knetwork.forex.domain.Broker;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Broker entity.
 */
@Repository
public interface BrokerRepository extends MongoRepository<Broker, String> {}
