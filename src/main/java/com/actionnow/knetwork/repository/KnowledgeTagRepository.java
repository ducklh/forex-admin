package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.KnowledgeTag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the KnowledgeTag entity.
 */
@Repository
public interface KnowledgeTagRepository extends MongoRepository<KnowledgeTag, String> {}
