package com.knetwork.forex.domain;

import java.util.UUID;

public class InstrumentTestSamples {

    public static Instrument getInstrumentSample1() {
        return new Instrument().id("id1").name("name1");
    }

    public static Instrument getInstrumentSample2() {
        return new Instrument().id("id2").name("name2");
    }

    public static Instrument getInstrumentRandomSampleGenerator() {
        return new Instrument().id(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
