package com.knetwork.forex.domain;

import java.util.UUID;

public class CryptoBrokerTestSamples {

    public static CryptoBroker getCryptoBrokerSample1() {
        return new CryptoBroker()
            .id("id1")
            .name("name1")
            .logo("logo1")
            .url("url1")
            .description("description1")
            .regulation("regulation1")
            .minDeposit("minDeposit1")
            .tradingFees("tradingFees1")
            .founded("founded1")
            .headquarters("headquarters1")
            .tradingVolume("tradingVolume1");
    }

    public static CryptoBroker getCryptoBrokerSample2() {
        return new CryptoBroker()
            .id("id2")
            .name("name2")
            .logo("logo2")
            .url("url2")
            .description("description2")
            .regulation("regulation2")
            .minDeposit("minDeposit2")
            .tradingFees("tradingFees2")
            .founded("founded2")
            .headquarters("headquarters2")
            .tradingVolume("tradingVolume2");
    }

    public static CryptoBroker getCryptoBrokerRandomSampleGenerator() {
        return new CryptoBroker()
            .id(UUID.randomUUID().toString())
            .name(UUID.randomUUID().toString())
            .logo(UUID.randomUUID().toString())
            .url(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .regulation(UUID.randomUUID().toString())
            .minDeposit(UUID.randomUUID().toString())
            .tradingFees(UUID.randomUUID().toString())
            .founded(UUID.randomUUID().toString())
            .headquarters(UUID.randomUUID().toString())
            .tradingVolume(UUID.randomUUID().toString());
    }
}
