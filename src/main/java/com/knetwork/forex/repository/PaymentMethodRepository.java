package com.knetwork.forex.repository;

import com.knetwork.forex.domain.PaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the PaymentMethod entity.
 */
@Repository
public interface PaymentMethodRepository extends MongoRepository<PaymentMethod, String> {}
