package com.actionnow.knetwork.domain;

import java.util.UUID;

public class InstrumentTestSamples {

    public static Instrument getInstrumentSample1() {
        return new Instrument().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Instrument getInstrumentSample2() {
        return new Instrument().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Instrument getInstrumentRandomSampleGenerator() {
        return new Instrument().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
