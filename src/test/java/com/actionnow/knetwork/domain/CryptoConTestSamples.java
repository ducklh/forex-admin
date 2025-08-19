package com.actionnow.knetwork.domain;

import java.util.UUID;

public class CryptoConTestSamples {

    public static CryptoCon getCryptoConSample1() {
        return new CryptoCon().id("id1").value("value1").valueEn("valueEn1");
    }

    public static CryptoCon getCryptoConSample2() {
        return new CryptoCon().id("id2").value("value2").valueEn("valueEn2");
    }

    public static CryptoCon getCryptoConRandomSampleGenerator() {
        return new CryptoCon().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
