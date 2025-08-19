package com.actionnow.knetwork.domain;

import java.util.UUID;

public class CustomerSupportTestSamples {

    public static CustomerSupport getCustomerSupportSample1() {
        return new CustomerSupport().id("id1").value("value1").valueEn("valueEn1");
    }

    public static CustomerSupport getCustomerSupportSample2() {
        return new CustomerSupport().id("id2").value("value2").valueEn("valueEn2");
    }

    public static CustomerSupport getCustomerSupportRandomSampleGenerator() {
        return new CustomerSupport()
            .id(UUID.randomUUID().toString())
            .value(UUID.randomUUID().toString())
            .valueEn(UUID.randomUUID().toString());
    }
}
