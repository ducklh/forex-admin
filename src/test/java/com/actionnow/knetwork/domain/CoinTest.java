package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CoinTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CoinTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Coin.class);
        Coin coin1 = getCoinSample1();
        Coin coin2 = new Coin();
        assertThat(coin1).isNotEqualTo(coin2);

        coin2.setId(coin1.getId());
        assertThat(coin1).isEqualTo(coin2);

        coin2 = getCoinSample2();
        assertThat(coin1).isNotEqualTo(coin2);
    }

    @Test
    void cryptoBrokersTest() {
        Coin coin = getCoinRandomSampleGenerator();
        CryptoBroker cryptoBrokerBack = getCryptoBrokerRandomSampleGenerator();

        coin.addCryptoBrokers(cryptoBrokerBack);
        assertThat(coin.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSupportedCoins()).containsOnly(coin);

        coin.removeCryptoBrokers(cryptoBrokerBack);
        assertThat(coin.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSupportedCoins()).doesNotContain(coin);

        coin.cryptoBrokers(new HashSet<>(Set.of(cryptoBrokerBack)));
        assertThat(coin.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSupportedCoins()).containsOnly(coin);

        coin.setCryptoBrokers(new HashSet<>());
        assertThat(coin.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSupportedCoins()).doesNotContain(coin);
    }
}
