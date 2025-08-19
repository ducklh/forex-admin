package com.actionnow.knetwork.domain;

import java.util.UUID;

public class TagTestSamples {

    public static Tag getTagSample1() {
        return new Tag().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Tag getTagSample2() {
        return new Tag().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Tag getTagRandomSampleGenerator() {
        return new Tag().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
