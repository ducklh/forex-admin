package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.ForexBroker;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ForexBroker entity.
 */
@Repository
public interface ForexBrokerRepository extends MongoRepository<ForexBroker, String> {
    @Query("{}")
    Page<ForexBroker> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<ForexBroker> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<ForexBroker> findOneWithEagerRelationships(String id);
}
