package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.PaymentMethodTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PaymentMethodTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentMethod.class);
        PaymentMethod paymentMethod1 = getPaymentMethodSample1();
        PaymentMethod paymentMethod2 = new PaymentMethod();
        assertThat(paymentMethod1).isNotEqualTo(paymentMethod2);

        paymentMethod2.setId(paymentMethod1.getId());
        assertThat(paymentMethod1).isEqualTo(paymentMethod2);

        paymentMethod2 = getPaymentMethodSample2();
        assertThat(paymentMethod1).isNotEqualTo(paymentMethod2);
    }

    @Test
    void brokerTest() {
        PaymentMethod paymentMethod = getPaymentMethodRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        paymentMethod.setBroker(brokerBack);
        assertThat(paymentMethod.getBroker()).isEqualTo(brokerBack);

        paymentMethod.broker(null);
        assertThat(paymentMethod.getBroker()).isNull();
    }
}
