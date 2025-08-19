package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.CustomerSupport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CustomerSupport entity.
 */
@Repository
public interface CustomerSupportRepository extends MongoRepository<CustomerSupport, String> {}
