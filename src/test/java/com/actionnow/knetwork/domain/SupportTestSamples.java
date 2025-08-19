package com.actionnow.knetwork.domain;

import java.util.UUID;

public class SupportTestSamples {

    public static Support getSupportSample1() {
        return new Support().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Support getSupportSample2() {
        return new Support().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Support getSupportRandomSampleGenerator() {
        return new Support().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
