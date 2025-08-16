package com.knetwork.forex.repository;

import com.knetwork.forex.domain.CryptoBroker;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CryptoBroker entity.
 */
@Repository
public interface CryptoBrokerRepository extends MongoRepository<CryptoBroker, String> {}
