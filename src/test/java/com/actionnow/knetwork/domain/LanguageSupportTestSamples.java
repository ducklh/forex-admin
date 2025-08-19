package com.actionnow.knetwork.domain;

import java.util.UUID;

public class LanguageSupportTestSamples {

    public static LanguageSupport getLanguageSupportSample1() {
        return new LanguageSupport().id("id1").value("value1").valueEn("valueEn1");
    }

    public static LanguageSupport getLanguageSupportSample2() {
        return new LanguageSupport().id("id2").value("value2").valueEn("valueEn2");
    }

    public static LanguageSupport getLanguageSupportRandomSampleGenerator() {
        return new LanguageSupport()
            .id(UUID.randomUUID().toString())
            .value(UUID.randomUUID().toString())
            .valueEn(UUID.randomUUID().toString());
    }
}
