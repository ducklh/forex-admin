package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.InstrumentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
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
    void brokerTest() {
        Instrument instrument = getInstrumentRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        instrument.setBroker(brokerBack);
        assertThat(instrument.getBroker()).isEqualTo(brokerBack);

        instrument.broker(null);
        assertThat(instrument.getBroker()).isNull();
    }
}
