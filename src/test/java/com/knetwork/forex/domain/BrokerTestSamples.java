package com.knetwork.forex.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class BrokerTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Broker getBrokerSample1() {
        return new Broker()
            .id("id1")
            .name("name1")
            .logo("logo1")
            .url("url1")
            .spreads("spreads1")
            .leverage("leverage1")
            .founded(1)
            .headquarters("headquarters1");
    }

    public static Broker getBrokerSample2() {
        return new Broker()
            .id("id2")
            .name("name2")
            .logo("logo2")
            .url("url2")
            .spreads("spreads2")
            .leverage("leverage2")
            .founded(2)
            .headquarters("headquarters2");
    }

    public static Broker getBrokerRandomSampleGenerator() {
        return new Broker()
            .id(UUID.randomUUID().toString())
            .name(UUID.randomUUID().toString())
            .logo(UUID.randomUUID().toString())
            .url(UUID.randomUUID().toString())
            .spreads(UUID.randomUUID().toString())
            .leverage(UUID.randomUUID().toString())
            .founded(intCount.incrementAndGet())
            .headquarters(UUID.randomUUID().toString());
    }
}
