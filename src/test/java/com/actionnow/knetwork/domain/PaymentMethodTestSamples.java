package com.actionnow.knetwork.domain;

import java.util.UUID;

public class PaymentMethodTestSamples {

    public static PaymentMethod getPaymentMethodSample1() {
        return new PaymentMethod().id("id1").value("value1").valueEn("valueEn1");
    }

    public static PaymentMethod getPaymentMethodSample2() {
        return new PaymentMethod().id("id2").value("value2").valueEn("valueEn2");
    }

    public static PaymentMethod getPaymentMethodRandomSampleGenerator() {
        return new PaymentMethod()
            .id(UUID.randomUUID().toString())
            .value(UUID.randomUUID().toString())
            .valueEn(UUID.randomUUID().toString());
    }
}
