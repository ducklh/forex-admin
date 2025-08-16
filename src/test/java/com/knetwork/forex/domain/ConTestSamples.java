package com.knetwork.forex.domain;

import java.util.UUID;

public class ConTestSamples {

    public static Con getConSample1() {
        return new Con().id("id1").text("text1");
    }

    public static Con getConSample2() {
        return new Con().id("id2").text("text2");
    }

    public static Con getConRandomSampleGenerator() {
        return new Con().id(UUID.randomUUID().toString()).text(UUID.randomUUID().toString());
    }
}
