package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.KnowledgeItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the KnowledgeItem entity.
 */
@Repository
public interface KnowledgeItemRepository extends MongoRepository<KnowledgeItem, String> {
    @Query("{}")
    Page<KnowledgeItem> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<KnowledgeItem> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<KnowledgeItem> findOneWithEagerRelationships(String id);
}
