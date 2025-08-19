package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.LanguageSupport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the LanguageSupport entity.
 */
@Repository
public interface LanguageSupportRepository extends MongoRepository<LanguageSupport, String> {}
