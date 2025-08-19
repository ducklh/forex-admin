package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoConTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CryptoConTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CryptoCon.class);
        CryptoCon cryptoCon1 = getCryptoConSample1();
        CryptoCon cryptoCon2 = new CryptoCon();
        assertThat(cryptoCon1).isNotEqualTo(cryptoCon2);

        cryptoCon2.setId(cryptoCon1.getId());
        assertThat(cryptoCon1).isEqualTo(cryptoCon2);

        cryptoCon2 = getCryptoConSample2();
        assertThat(cryptoCon1).isNotEqualTo(cryptoCon2);
    }

    @Test
    void cryptoBrokersTest() {
        CryptoCon cryptoCon = getCryptoConRandomSampleGenerator();
        CryptoBroker cryptoBrokerBack = getCryptoBrokerRandomSampleGenerator();

        cryptoCon.addCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoCon.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoCons()).containsOnly(cryptoCon);

        cryptoCon.removeCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoCon.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoCons()).doesNotContain(cryptoCon);

        cryptoCon.cryptoBrokers(new HashSet<>(Set.of(cryptoBrokerBack)));
        assertThat(cryptoCon.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoCons()).containsOnly(cryptoCon);

        cryptoCon.setCryptoBrokers(new HashSet<>());
        assertThat(cryptoCon.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoCons()).doesNotContain(cryptoCon);
    }
}
