package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.Pro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Pro entity.
 */
@Repository
public interface ProRepository extends MongoRepository<Pro, String> {}
