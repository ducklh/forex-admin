package com.actionnow.knetwork.domain;

import java.util.UUID;

public class CoinTestSamples {

    public static Coin getCoinSample1() {
        return new Coin().id("id1").value("value1").valueEn("valueEn1");
    }

    public static Coin getCoinSample2() {
        return new Coin().id("id2").value("value2").valueEn("valueEn2");
    }

    public static Coin getCoinRandomSampleGenerator() {
        return new Coin().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
