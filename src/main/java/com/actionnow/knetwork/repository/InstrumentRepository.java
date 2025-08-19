package com.actionnow.knetwork.repository;

import com.actionnow.knetwork.domain.Instrument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Instrument entity.
 */
@Repository
public interface InstrumentRepository extends MongoRepository<Instrument, String> {}
