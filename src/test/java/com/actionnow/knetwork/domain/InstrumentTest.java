package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.InstrumentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class InstrumentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Instrument.class);
        Instrument instrument1 = getInstrumentSample1();
        Instrument instrument2 = new Instrument();
        assertThat(instrument1).isNotEqualTo(instrument2);

        instrument2.setId(instrument1.getId());
        assertThat(instrument1).isEqualTo(instrument2);

        instrument2 = getInstrumentSample2();
        assertThat(instrument1).isNotEqualTo(instrument2);
    }

    @Test
    void forexBrokersTest() {
        Instrument instrument = getInstrumentRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        instrument.addForexBrokers(forexBrokerBack);
        assertThat(instrument.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexInstruments()).containsOnly(instrument);

        instrument.removeForexBrokers(forexBrokerBack);
        assertThat(instrument.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexInstruments()).doesNotContain(instrument);

        instrument.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(instrument.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexInstruments()).containsOnly(instrument);

        instrument.setForexBrokers(new HashSet<>());
        assertThat(instrument.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexInstruments()).doesNotContain(instrument);
    }
}
