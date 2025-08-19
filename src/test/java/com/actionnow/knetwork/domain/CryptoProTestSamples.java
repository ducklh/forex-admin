package com.actionnow.knetwork.domain;

import java.util.UUID;

public class CryptoProTestSamples {

    public static CryptoPro getCryptoProSample1() {
        return new CryptoPro().id("id1").value("value1").valueEn("valueEn1");
    }

    public static CryptoPro getCryptoProSample2() {
        return new CryptoPro().id("id2").value("value2").valueEn("valueEn2");
    }

    public static CryptoPro getCryptoProRandomSampleGenerator() {
        return new CryptoPro().id(UUID.randomUUID().toString()).value(UUID.randomUUID().toString()).valueEn(UUID.randomUUID().toString());
    }
}
