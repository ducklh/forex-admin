package com.actionnow.knetwork.domain;

import java.util.UUID;

public class CryptoFeatureTestSamples {

    public static CryptoFeature getCryptoFeatureSample1() {
        return new CryptoFeature().id("id1").value("value1").valueEn("valueEn1");
    }

    public static CryptoFeature getCryptoFeatureSample2() {
        return new CryptoFeature().id("id2").value("value2").valueEn("valueEn2");
    }

    public static CryptoFeature getCryptoFeatureRandomSampleGenerator() {
        return new CryptoFeature()
            .id(UUID.randomUUID().toString())
            .value(UUID.randomUUID().toString())
            .valueEn(UUID.randomUUID().toString());
    }
}
