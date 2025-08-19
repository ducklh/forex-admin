package com.actionnow.knetwork.domain;

import java.util.UUID;

public class KnowledgeTagTestSamples {

    public static KnowledgeTag getKnowledgeTagSample1() {
        return new KnowledgeTag().id("id1").value("value1").valueEn("valueEn1");
    }

    public static KnowledgeTag getKnowledgeTagSample2() {
        return new KnowledgeTag().id("id2").value("value2").valueEn("valueEn2");
    }

    public static KnowledgeTag getKnowledgeTagRandomSampleGenerator() {
        return new KnowledgeTag()
            .id(UUID.randomUUID().toString())
            .value(UUID.randomUUID().toString())
            .valueEn(UUID.randomUUID().toString());
    }
}
