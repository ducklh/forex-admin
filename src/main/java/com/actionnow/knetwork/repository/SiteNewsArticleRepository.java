package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.SiteNewsArticle;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SiteNewsArticle entity.
 */
@Repository
public interface SiteNewsArticleRepository extends MongoRepository<SiteNewsArticle, String> {
    @Query("{}")
    Page<SiteNewsArticle> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<SiteNewsArticle> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<SiteNewsArticle> findOneWithEagerRelationships(String id);
}
