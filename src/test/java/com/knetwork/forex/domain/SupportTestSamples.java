package com.knetwork.forex.domain;

import java.util.UUID;

public class SupportTestSamples {

    public static Support getSupportSample1() {
        return new Support().id("id1").type("type1");
    }

    public static Support getSupportSample2() {
        return new Support().id("id2").type("type2");
    }

    public static Support getSupportRandomSampleGenerator() {
        return new Support().id(UUID.randomUUID().toString()).type(UUID.randomUUID().toString());
    }
}
