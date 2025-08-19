package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.CryptoPaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CryptoPaymentMethod entity.
 */
@Repository
public interface CryptoPaymentMethodRepository extends MongoRepository<CryptoPaymentMethod, String> {}
