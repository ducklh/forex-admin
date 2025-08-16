package com.knetwork.forex.domain;

import java.util.UUID;

public class PlatformTestSamples {

    public static Platform getPlatformSample1() {
        return new Platform().id("id1").name("name1");
    }

    public static Platform getPlatformSample2() {
        return new Platform().id("id2").name("name2");
    }

    public static Platform getPlatformRandomSampleGenerator() {
        return new Platform().id(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
