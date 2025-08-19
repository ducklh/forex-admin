package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoProTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CryptoProTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CryptoPro.class);
        CryptoPro cryptoPro1 = getCryptoProSample1();
        CryptoPro cryptoPro2 = new CryptoPro();
        assertThat(cryptoPro1).isNotEqualTo(cryptoPro2);

        cryptoPro2.setId(cryptoPro1.getId());
        assertThat(cryptoPro1).isEqualTo(cryptoPro2);

        cryptoPro2 = getCryptoProSample2();
        assertThat(cryptoPro1).isNotEqualTo(cryptoPro2);
    }

    @Test
    void cryptoBrokersTest() {
        CryptoPro cryptoPro = getCryptoProRandomSampleGenerator();
        CryptoBroker cryptoBrokerBack = getCryptoBrokerRandomSampleGenerator();

        cryptoPro.addCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoPro.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoPros()).containsOnly(cryptoPro);

        cryptoPro.removeCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoPro.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoPros()).doesNotContain(cryptoPro);

        cryptoPro.cryptoBrokers(new HashSet<>(Set.of(cryptoBrokerBack)));
        assertThat(cryptoPro.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoPros()).containsOnly(cryptoPro);

        cryptoPro.setCryptoBrokers(new HashSet<>());
        assertThat(cryptoPro.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoPros()).doesNotContain(cryptoPro);
    }
}
