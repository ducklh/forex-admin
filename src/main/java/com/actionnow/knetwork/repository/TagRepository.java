package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Tag entity.
 */
@Repository
public interface TagRepository extends MongoRepository<Tag, String> {}
