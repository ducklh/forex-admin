package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.CryptoBrokerTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CryptoBrokerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CryptoBroker.class);
        CryptoBroker cryptoBroker1 = getCryptoBrokerSample1();
        CryptoBroker cryptoBroker2 = new CryptoBroker();
        assertThat(cryptoBroker1).isNotEqualTo(cryptoBroker2);

        cryptoBroker2.setId(cryptoBroker1.getId());
        assertThat(cryptoBroker1).isEqualTo(cryptoBroker2);

        cryptoBroker2 = getCryptoBrokerSample2();
        assertThat(cryptoBroker1).isNotEqualTo(cryptoBroker2);
    }
}
