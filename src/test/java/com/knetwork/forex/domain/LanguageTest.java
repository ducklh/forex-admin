package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.LanguageTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LanguageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Language.class);
        Language language1 = getLanguageSample1();
        Language language2 = new Language();
        assertThat(language1).isNotEqualTo(language2);

        language2.setId(language1.getId());
        assertThat(language1).isEqualTo(language2);

        language2 = getLanguageSample2();
        assertThat(language1).isNotEqualTo(language2);
    }

    @Test
    void brokerTest() {
        Language language = getLanguageRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        language.setBroker(brokerBack);
        assertThat(language.getBroker()).isEqualTo(brokerBack);

        language.broker(null);
        assertThat(language.getBroker()).isNull();
    }
}
