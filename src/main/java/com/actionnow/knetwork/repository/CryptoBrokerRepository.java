package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.CryptoBroker;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CryptoBroker entity.
 */
@Repository
public interface CryptoBrokerRepository extends MongoRepository<CryptoBroker, String> {
    @Query("{}")
    Page<CryptoBroker> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<CryptoBroker> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<CryptoBroker> findOneWithEagerRelationships(String id);
}
