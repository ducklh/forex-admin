package com.knetwork.forex.domain;

import java.util.UUID;

public class LanguageTestSamples {

    public static Language getLanguageSample1() {
        return new Language().id("id1").code("code1").name("name1");
    }

    public static Language getLanguageSample2() {
        return new Language().id("id2").code("code2").name("name2");
    }

    public static Language getLanguageRandomSampleGenerator() {
        return new Language().id(UUID.randomUUID().toString()).code(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
