package com.actionnow.knetwork.domain;

import java.util.UUID;

public class ForexBrokerTestSamples {

    public static ForexBroker getForexBrokerSample1() {
        return new ForexBroker()
            .id("id1")
            .name("name1")
            .nameEn("nameEn1")
            .logo("logo1")
            .url("url1")
            .regulation("regulation1")
            .minDeposit("minDeposit1")
            .spreads("spreads1")
            .leverage("leverage1")
            .founded("founded1")
            .headquarters("headquarters1")
            .headquartersEn("headquartersEn1");
    }

    public static ForexBroker getForexBrokerSample2() {
        return new ForexBroker()
            .id("id2")
            .name("name2")
            .nameEn("nameEn2")
            .logo("logo2")
            .url("url2")
            .regulation("regulation2")
            .minDeposit("minDeposit2")
            .spreads("spreads2")
            .leverage("leverage2")
            .founded("founded2")
            .headquarters("headquarters2")
            .headquartersEn("headquartersEn2");
    }

    public static ForexBroker getForexBrokerRandomSampleGenerator() {
        return new ForexBroker()
            .id(UUID.randomUUID().toString())
            .name(UUID.randomUUID().toString())
            .nameEn(UUID.randomUUID().toString())
            .logo(UUID.randomUUID().toString())
            .url(UUID.randomUUID().toString())
            .regulation(UUID.randomUUID().toString())
            .minDeposit(UUID.randomUUID().toString())
            .spreads(UUID.randomUUID().toString())
            .leverage(UUID.randomUUID().toString())
            .founded(UUID.randomUUID().toString())
            .headquarters(UUID.randomUUID().toString())
            .headquartersEn(UUID.randomUUID().toString());
    }
}
