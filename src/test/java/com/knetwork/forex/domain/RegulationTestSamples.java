package com.knetwork.forex.domain;

import java.util.UUID;

public class RegulationTestSamples {

    public static Regulation getRegulationSample1() {
        return new Regulation().id("id1").authority("authority1");
    }

    public static Regulation getRegulationSample2() {
        return new Regulation().id("id2").authority("authority2");
    }

    public static Regulation getRegulationRandomSampleGenerator() {
        return new Regulation().id(UUID.randomUUID().toString()).authority(UUID.randomUUID().toString());
    }
}
