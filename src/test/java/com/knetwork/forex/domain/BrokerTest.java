package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.ConTestSamples.*;
import static com.knetwork.forex.domain.FeatureTestSamples.*;
import static com.knetwork.forex.domain.InstrumentTestSamples.*;
import static com.knetwork.forex.domain.LanguageTestSamples.*;
import static com.knetwork.forex.domain.PaymentMethodTestSamples.*;
import static com.knetwork.forex.domain.PlatformTestSamples.*;
import static com.knetwork.forex.domain.ProTestSamples.*;
import static com.knetwork.forex.domain.RegulationTestSamples.*;
import static com.knetwork.forex.domain.SupportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class BrokerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Broker.class);
        Broker broker1 = getBrokerSample1();
        Broker broker2 = new Broker();
        assertThat(broker1).isNotEqualTo(broker2);

        broker2.setId(broker1.getId());
        assertThat(broker1).isEqualTo(broker2);

        broker2 = getBrokerSample2();
        assertThat(broker1).isNotEqualTo(broker2);
    }

    @Test
    void featuresTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Feature featureBack = getFeatureRandomSampleGenerator();

        broker.addFeatures(featureBack);
        assertThat(broker.getFeatures()).containsOnly(featureBack);
        assertThat(featureBack.getBroker()).isEqualTo(broker);

        broker.removeFeatures(featureBack);
        assertThat(broker.getFeatures()).doesNotContain(featureBack);
        assertThat(featureBack.getBroker()).isNull();

        broker.features(new HashSet<>(Set.of(featureBack)));
        assertThat(broker.getFeatures()).containsOnly(featureBack);
        assertThat(featureBack.getBroker()).isEqualTo(broker);

        broker.setFeatures(new HashSet<>());
        assertThat(broker.getFeatures()).doesNotContain(featureBack);
        assertThat(featureBack.getBroker()).isNull();
    }

    @Test
    void regulationsTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Regulation regulationBack = getRegulationRandomSampleGenerator();

        broker.addRegulations(regulationBack);
        assertThat(broker.getRegulations()).containsOnly(regulationBack);
        assertThat(regulationBack.getBroker()).isEqualTo(broker);

        broker.removeRegulations(regulationBack);
        assertThat(broker.getRegulations()).doesNotContain(regulationBack);
        assertThat(regulationBack.getBroker()).isNull();

        broker.regulations(new HashSet<>(Set.of(regulationBack)));
        assertThat(broker.getRegulations()).containsOnly(regulationBack);
        assertThat(regulationBack.getBroker()).isEqualTo(broker);

        broker.setRegulations(new HashSet<>());
        assertThat(broker.getRegulations()).doesNotContain(regulationBack);
        assertThat(regulationBack.getBroker()).isNull();
    }

    @Test
    void platformsTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Platform platformBack = getPlatformRandomSampleGenerator();

        broker.addPlatforms(platformBack);
        assertThat(broker.getPlatforms()).containsOnly(platformBack);
        assertThat(platformBack.getBroker()).isEqualTo(broker);

        broker.removePlatforms(platformBack);
        assertThat(broker.getPlatforms()).doesNotContain(platformBack);
        assertThat(platformBack.getBroker()).isNull();

        broker.platforms(new HashSet<>(Set.of(platformBack)));
        assertThat(broker.getPlatforms()).containsOnly(platformBack);
        assertThat(platformBack.getBroker()).isEqualTo(broker);

        broker.setPlatforms(new HashSet<>());
        assertThat(broker.getPlatforms()).doesNotContain(platformBack);
        assertThat(platformBack.getBroker()).isNull();
    }

    @Test
    void instrumentsTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Instrument instrumentBack = getInstrumentRandomSampleGenerator();

        broker.addInstruments(instrumentBack);
        assertThat(broker.getInstruments()).containsOnly(instrumentBack);
        assertThat(instrumentBack.getBroker()).isEqualTo(broker);

        broker.removeInstruments(instrumentBack);
        assertThat(broker.getInstruments()).doesNotContain(instrumentBack);
        assertThat(instrumentBack.getBroker()).isNull();

        broker.instruments(new HashSet<>(Set.of(instrumentBack)));
        assertThat(broker.getInstruments()).containsOnly(instrumentBack);
        assertThat(instrumentBack.getBroker()).isEqualTo(broker);

        broker.setInstruments(new HashSet<>());
        assertThat(broker.getInstruments()).doesNotContain(instrumentBack);
        assertThat(instrumentBack.getBroker()).isNull();
    }

    @Test
    void prosTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Pro proBack = getProRandomSampleGenerator();

        broker.addPros(proBack);
        assertThat(broker.getPros()).containsOnly(proBack);
        assertThat(proBack.getBroker()).isEqualTo(broker);

        broker.removePros(proBack);
        assertThat(broker.getPros()).doesNotContain(proBack);
        assertThat(proBack.getBroker()).isNull();

        broker.pros(new HashSet<>(Set.of(proBack)));
        assertThat(broker.getPros()).containsOnly(proBack);
        assertThat(proBack.getBroker()).isEqualTo(broker);

        broker.setPros(new HashSet<>());
        assertThat(broker.getPros()).doesNotContain(proBack);
        assertThat(proBack.getBroker()).isNull();
    }

    @Test
    void consTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Con conBack = getConRandomSampleGenerator();

        broker.addCons(conBack);
        assertThat(broker.getCons()).containsOnly(conBack);
        assertThat(conBack.getBroker()).isEqualTo(broker);

        broker.removeCons(conBack);
        assertThat(broker.getCons()).doesNotContain(conBack);
        assertThat(conBack.getBroker()).isNull();

        broker.cons(new HashSet<>(Set.of(conBack)));
        assertThat(broker.getCons()).containsOnly(conBack);
        assertThat(conBack.getBroker()).isEqualTo(broker);

        broker.setCons(new HashSet<>());
        assertThat(broker.getCons()).doesNotContain(conBack);
        assertThat(conBack.getBroker()).isNull();
    }

    @Test
    void languagesTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Language languageBack = getLanguageRandomSampleGenerator();

        broker.addLanguages(languageBack);
        assertThat(broker.getLanguages()).containsOnly(languageBack);
        assertThat(languageBack.getBroker()).isEqualTo(broker);

        broker.removeLanguages(languageBack);
        assertThat(broker.getLanguages()).doesNotContain(languageBack);
        assertThat(languageBack.getBroker()).isNull();

        broker.languages(new HashSet<>(Set.of(languageBack)));
        assertThat(broker.getLanguages()).containsOnly(languageBack);
        assertThat(languageBack.getBroker()).isEqualTo(broker);

        broker.setLanguages(new HashSet<>());
        assertThat(broker.getLanguages()).doesNotContain(languageBack);
        assertThat(languageBack.getBroker()).isNull();
    }

    @Test
    void supportsTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        Support supportBack = getSupportRandomSampleGenerator();

        broker.addSupports(supportBack);
        assertThat(broker.getSupports()).containsOnly(supportBack);
        assertThat(supportBack.getBroker()).isEqualTo(broker);

        broker.removeSupports(supportBack);
        assertThat(broker.getSupports()).doesNotContain(supportBack);
        assertThat(supportBack.getBroker()).isNull();

        broker.supports(new HashSet<>(Set.of(supportBack)));
        assertThat(broker.getSupports()).containsOnly(supportBack);
        assertThat(supportBack.getBroker()).isEqualTo(broker);

        broker.setSupports(new HashSet<>());
        assertThat(broker.getSupports()).doesNotContain(supportBack);
        assertThat(supportBack.getBroker()).isNull();
    }

    @Test
    void paymentMethodsTest() {
        Broker broker = getBrokerRandomSampleGenerator();
        PaymentMethod paymentMethodBack = getPaymentMethodRandomSampleGenerator();

        broker.addPaymentMethods(paymentMethodBack);
        assertThat(broker.getPaymentMethods()).containsOnly(paymentMethodBack);
        assertThat(paymentMethodBack.getBroker()).isEqualTo(broker);

        broker.removePaymentMethods(paymentMethodBack);
        assertThat(broker.getPaymentMethods()).doesNotContain(paymentMethodBack);
        assertThat(paymentMethodBack.getBroker()).isNull();

        broker.paymentMethods(new HashSet<>(Set.of(paymentMethodBack)));
        assertThat(broker.getPaymentMethods()).containsOnly(paymentMethodBack);
        assertThat(paymentMethodBack.getBroker()).isEqualTo(broker);

        broker.setPaymentMethods(new HashSet<>());
        assertThat(broker.getPaymentMethods()).doesNotContain(paymentMethodBack);
        assertThat(paymentMethodBack.getBroker()).isNull();
    }
}
