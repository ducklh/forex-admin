package com.actionnow.knetwork.domain;

import java.util.UUID;

public class CryptoPaymentMethodTestSamples {

    public static CryptoPaymentMethod getCryptoPaymentMethodSample1() {
        return new CryptoPaymentMethod().id("id1").value("value1").valueEn("valueEn1");
    }

    public static CryptoPaymentMethod getCryptoPaymentMethodSample2() {
        return new CryptoPaymentMethod().id("id2").value("value2").valueEn("valueEn2");
    }

    public static CryptoPaymentMethod getCryptoPaymentMethodRandomSampleGenerator() {
        return new CryptoPaymentMethod()
            .id(UUID.randomUUID().toString())
            .value(UUID.randomUUID().toString())
            .valueEn(UUID.randomUUID().toString());
    }
}
