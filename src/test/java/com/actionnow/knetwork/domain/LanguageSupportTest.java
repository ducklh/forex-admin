package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.LanguageSupportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LanguageSupportTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LanguageSupport.class);
        LanguageSupport languageSupport1 = getLanguageSupportSample1();
        LanguageSupport languageSupport2 = new LanguageSupport();
        assertThat(languageSupport1).isNotEqualTo(languageSupport2);

        languageSupport2.setId(languageSupport1.getId());
        assertThat(languageSupport1).isEqualTo(languageSupport2);

        languageSupport2 = getLanguageSupportSample2();
        assertThat(languageSupport1).isNotEqualTo(languageSupport2);
    }

    @Test
    void forexBrokersTest() {
        LanguageSupport languageSupport = getLanguageSupportRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        languageSupport.addForexBrokers(forexBrokerBack);
        assertThat(languageSupport.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexLanguages()).containsOnly(languageSupport);

        languageSupport.removeForexBrokers(forexBrokerBack);
        assertThat(languageSupport.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexLanguages()).doesNotContain(languageSupport);

        languageSupport.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(languageSupport.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexLanguages()).containsOnly(languageSupport);

        languageSupport.setForexBrokers(new HashSet<>());
        assertThat(languageSupport.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexLanguages()).doesNotContain(languageSupport);
    }
}
