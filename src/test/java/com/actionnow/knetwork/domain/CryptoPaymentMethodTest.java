package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoPaymentMethodTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CryptoPaymentMethodTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CryptoPaymentMethod.class);
        CryptoPaymentMethod cryptoPaymentMethod1 = getCryptoPaymentMethodSample1();
        CryptoPaymentMethod cryptoPaymentMethod2 = new CryptoPaymentMethod();
        assertThat(cryptoPaymentMethod1).isNotEqualTo(cryptoPaymentMethod2);

        cryptoPaymentMethod2.setId(cryptoPaymentMethod1.getId());
        assertThat(cryptoPaymentMethod1).isEqualTo(cryptoPaymentMethod2);

        cryptoPaymentMethod2 = getCryptoPaymentMethodSample2();
        assertThat(cryptoPaymentMethod1).isNotEqualTo(cryptoPaymentMethod2);
    }

    @Test
    void cryptoBrokersTest() {
        CryptoPaymentMethod cryptoPaymentMethod = getCryptoPaymentMethodRandomSampleGenerator();
        CryptoBroker cryptoBrokerBack = getCryptoBrokerRandomSampleGenerator();

        cryptoPaymentMethod.addCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoPaymentMethod.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getPaymentMethods()).containsOnly(cryptoPaymentMethod);

        cryptoPaymentMethod.removeCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoPaymentMethod.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getPaymentMethods()).doesNotContain(cryptoPaymentMethod);

        cryptoPaymentMethod.cryptoBrokers(new HashSet<>(Set.of(cryptoBrokerBack)));
        assertThat(cryptoPaymentMethod.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getPaymentMethods()).containsOnly(cryptoPaymentMethod);

        cryptoPaymentMethod.setCryptoBrokers(new HashSet<>());
        assertThat(cryptoPaymentMethod.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getPaymentMethods()).doesNotContain(cryptoPaymentMethod);
    }
}
