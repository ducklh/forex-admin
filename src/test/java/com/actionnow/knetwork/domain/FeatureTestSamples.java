package com.actionnow.knetwork.domain;

import java.util.UUID;

public class FeatureTestSamples {

    public static Feature getFeatureSample1() {
        return new Feature().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Feature getFeatureSample2() {
        return new Feature().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Feature getFeatureRandomSampleGenerator() {
        return new Feature().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
