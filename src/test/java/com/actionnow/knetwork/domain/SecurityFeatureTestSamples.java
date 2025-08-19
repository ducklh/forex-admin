package com.actionnow.knetwork.domain;

import java.util.UUID;

public class SecurityFeatureTestSamples {

    public static SecurityFeature getSecurityFeatureSample1() {
        return new SecurityFeature().id("id1").value("value1").valueEn("valueEn1");
    }

    public static SecurityFeature getSecurityFeatureSample2() {
        return new SecurityFeature().id("id2").value("value2").valueEn("valueEn2");
    }

    public static SecurityFeature getSecurityFeatureRandomSampleGenerator() {
        return new SecurityFeature()
            .id(UUID.randomUUID().toString())
            .value(UUID.randomUUID().toString())
            .valueEn(UUID.randomUUID().toString());
    }
}
