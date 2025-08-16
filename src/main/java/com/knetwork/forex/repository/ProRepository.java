package com.knetwork.forex.repository;

import com.knetwork.forex.domain.Pro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Pro entity.
 */
@Repository
public interface ProRepository extends MongoRepository<Pro, String> {}
