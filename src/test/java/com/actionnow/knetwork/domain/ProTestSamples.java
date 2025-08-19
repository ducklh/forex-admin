package com.actionnow.knetwork.domain;

import java.util.UUID;

public class ProTestSamples {

    public static Pro getProSample1() {
        return new Pro().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Pro getProSample2() {
        return new Pro().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Pro getProRandomSampleGenerator() {
        return new Pro().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
