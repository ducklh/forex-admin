package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ConTestSamples.*;
import static com.actionnow.knetwork.domain.FeatureTestSamples.*;
import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.InstrumentTestSamples.*;
import static com.actionnow.knetwork.domain.LanguageSupportTestSamples.*;
import static com.actionnow.knetwork.domain.PaymentMethodTestSamples.*;
import static com.actionnow.knetwork.domain.PlatformTestSamples.*;
import static com.actionnow.knetwork.domain.ProTestSamples.*;
import static com.actionnow.knetwork.domain.SupportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ForexBrokerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ForexBroker.class);
        ForexBroker forexBroker1 = getForexBrokerSample1();
        ForexBroker forexBroker2 = new ForexBroker();
        assertThat(forexBroker1).isNotEqualTo(forexBroker2);

        forexBroker2.setId(forexBroker1.getId());
        assertThat(forexBroker1).isEqualTo(forexBroker2);

        forexBroker2 = getForexBrokerSample2();
        assertThat(forexBroker1).isNotEqualTo(forexBroker2);
    }

    @Test
    void forexFeaturesTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        Feature featureBack = getFeatureRandomSampleGenerator();

        forexBroker.addForexFeatures(featureBack);
        assertThat(forexBroker.getForexFeatures()).containsOnly(featureBack);

        forexBroker.removeForexFeatures(featureBack);
        assertThat(forexBroker.getForexFeatures()).doesNotContain(featureBack);

        forexBroker.forexFeatures(new HashSet<>(Set.of(featureBack)));
        assertThat(forexBroker.getForexFeatures()).containsOnly(featureBack);

        forexBroker.setForexFeatures(new HashSet<>());
        assertThat(forexBroker.getForexFeatures()).doesNotContain(featureBack);
    }

    @Test
    void forexPlatformsTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        Platform platformBack = getPlatformRandomSampleGenerator();

        forexBroker.addForexPlatforms(platformBack);
        assertThat(forexBroker.getForexPlatforms()).containsOnly(platformBack);

        forexBroker.removeForexPlatforms(platformBack);
        assertThat(forexBroker.getForexPlatforms()).doesNotContain(platformBack);

        forexBroker.forexPlatforms(new HashSet<>(Set.of(platformBack)));
        assertThat(forexBroker.getForexPlatforms()).containsOnly(platformBack);

        forexBroker.setForexPlatforms(new HashSet<>());
        assertThat(forexBroker.getForexPlatforms()).doesNotContain(platformBack);
    }

    @Test
    void forexInstrumentsTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        Instrument instrumentBack = getInstrumentRandomSampleGenerator();

        forexBroker.addForexInstruments(instrumentBack);
        assertThat(forexBroker.getForexInstruments()).containsOnly(instrumentBack);

        forexBroker.removeForexInstruments(instrumentBack);
        assertThat(forexBroker.getForexInstruments()).doesNotContain(instrumentBack);

        forexBroker.forexInstruments(new HashSet<>(Set.of(instrumentBack)));
        assertThat(forexBroker.getForexInstruments()).containsOnly(instrumentBack);

        forexBroker.setForexInstruments(new HashSet<>());
        assertThat(forexBroker.getForexInstruments()).doesNotContain(instrumentBack);
    }

    @Test
    void forexProsTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        Pro proBack = getProRandomSampleGenerator();

        forexBroker.addForexPros(proBack);
        assertThat(forexBroker.getForexPros()).containsOnly(proBack);

        forexBroker.removeForexPros(proBack);
        assertThat(forexBroker.getForexPros()).doesNotContain(proBack);

        forexBroker.forexPros(new HashSet<>(Set.of(proBack)));
        assertThat(forexBroker.getForexPros()).containsOnly(proBack);

        forexBroker.setForexPros(new HashSet<>());
        assertThat(forexBroker.getForexPros()).doesNotContain(proBack);
    }

    @Test
    void forexConsTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        Con conBack = getConRandomSampleGenerator();

        forexBroker.addForexCons(conBack);
        assertThat(forexBroker.getForexCons()).containsOnly(conBack);

        forexBroker.removeForexCons(conBack);
        assertThat(forexBroker.getForexCons()).doesNotContain(conBack);

        forexBroker.forexCons(new HashSet<>(Set.of(conBack)));
        assertThat(forexBroker.getForexCons()).containsOnly(conBack);

        forexBroker.setForexCons(new HashSet<>());
        assertThat(forexBroker.getForexCons()).doesNotContain(conBack);
    }

    @Test
    void forexLanguagesTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        LanguageSupport languageSupportBack = getLanguageSupportRandomSampleGenerator();

        forexBroker.addForexLanguages(languageSupportBack);
        assertThat(forexBroker.getForexLanguages()).containsOnly(languageSupportBack);

        forexBroker.removeForexLanguages(languageSupportBack);
        assertThat(forexBroker.getForexLanguages()).doesNotContain(languageSupportBack);

        forexBroker.forexLanguages(new HashSet<>(Set.of(languageSupportBack)));
        assertThat(forexBroker.getForexLanguages()).containsOnly(languageSupportBack);

        forexBroker.setForexLanguages(new HashSet<>());
        assertThat(forexBroker.getForexLanguages()).doesNotContain(languageSupportBack);
    }

    @Test
    void forexSupportsTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        Support supportBack = getSupportRandomSampleGenerator();

        forexBroker.addForexSupports(supportBack);
        assertThat(forexBroker.getForexSupports()).containsOnly(supportBack);

        forexBroker.removeForexSupports(supportBack);
        assertThat(forexBroker.getForexSupports()).doesNotContain(supportBack);

        forexBroker.forexSupports(new HashSet<>(Set.of(supportBack)));
        assertThat(forexBroker.getForexSupports()).containsOnly(supportBack);

        forexBroker.setForexSupports(new HashSet<>());
        assertThat(forexBroker.getForexSupports()).doesNotContain(supportBack);
    }

    @Test
    void forexPaymentMethodsTest() {
        ForexBroker forexBroker = getForexBrokerRandomSampleGenerator();
        PaymentMethod paymentMethodBack = getPaymentMethodRandomSampleGenerator();

        forexBroker.addForexPaymentMethods(paymentMethodBack);
        assertThat(forexBroker.getForexPaymentMethods()).containsOnly(paymentMethodBack);

        forexBroker.removeForexPaymentMethods(paymentMethodBack);
        assertThat(forexBroker.getForexPaymentMethods()).doesNotContain(paymentMethodBack);

        forexBroker.forexPaymentMethods(new HashSet<>(Set.of(paymentMethodBack)));
        assertThat(forexBroker.getForexPaymentMethods()).containsOnly(paymentMethodBack);

        forexBroker.setForexPaymentMethods(new HashSet<>());
        assertThat(forexBroker.getForexPaymentMethods()).doesNotContain(paymentMethodBack);
    }
}
