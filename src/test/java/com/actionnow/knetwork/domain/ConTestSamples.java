package com.actionnow.knetwork.domain;

import java.util.UUID;

public class ConTestSamples {

    public static Con getConSample1() {
        return new Con().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Con getConSample2() {
        return new Con().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Con getConRandomSampleGenerator() {
        return new Con().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
