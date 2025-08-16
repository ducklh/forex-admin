package com.knetwork.forex.domain;

import java.util.UUID;

public class ProTestSamples {

    public static Pro getProSample1() {
        return new Pro().id("id1").text("text1");
    }

    public static Pro getProSample2() {
        return new Pro().id("id2").text("text2");
    }

    public static Pro getProRandomSampleGenerator() {
        return new Pro().id(UUID.randomUUID().toString()).text(UUID.randomUUID().toString());
    }
}
