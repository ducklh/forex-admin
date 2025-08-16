package com.knetwork.forex.domain;

import java.util.UUID;

public class PaymentMethodTestSamples {

    public static PaymentMethod getPaymentMethodSample1() {
        return new PaymentMethod().id("id1").name("name1");
    }

    public static PaymentMethod getPaymentMethodSample2() {
        return new PaymentMethod().id("id2").name("name2");
    }

    public static PaymentMethod getPaymentMethodRandomSampleGenerator() {
        return new PaymentMethod().id(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
