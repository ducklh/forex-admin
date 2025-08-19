package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.PaymentMethodTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
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
    void forexBrokersTest() {
        PaymentMethod paymentMethod = getPaymentMethodRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        paymentMethod.addForexBrokers(forexBrokerBack);
        assertThat(paymentMethod.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPaymentMethods()).containsOnly(paymentMethod);

        paymentMethod.removeForexBrokers(forexBrokerBack);
        assertThat(paymentMethod.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPaymentMethods()).doesNotContain(paymentMethod);

        paymentMethod.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(paymentMethod.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPaymentMethods()).containsOnly(paymentMethod);

        paymentMethod.setForexBrokers(new HashSet<>());
        assertThat(paymentMethod.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPaymentMethods()).doesNotContain(paymentMethod);
    }
}
