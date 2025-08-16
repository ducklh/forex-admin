package com.knetwork.forex.repository;

import com.knetwork.forex.domain.Language;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Language entity.
 */
@Repository
public interface LanguageRepository extends MongoRepository<Language, String> {}
