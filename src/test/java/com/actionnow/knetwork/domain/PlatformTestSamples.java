package com.actionnow.knetwork.domain;

import java.util.UUID;

public class PlatformTestSamples {

    public static Platform getPlatformSample1() {
        return new Platform().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Platform getPlatformSample2() {
        return new Platform().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Platform getPlatformRandomSampleGenerator() {
        return new Platform().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
