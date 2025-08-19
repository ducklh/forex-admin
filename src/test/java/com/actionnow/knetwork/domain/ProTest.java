package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.ProTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pro.class);
        Pro pro1 = getProSample1();
        Pro pro2 = new Pro();
        assertThat(pro1).isNotEqualTo(pro2);

        pro2.setId(pro1.getId());
        assertThat(pro1).isEqualTo(pro2);

        pro2 = getProSample2();
        assertThat(pro1).isNotEqualTo(pro2);
    }

    @Test
    void forexBrokersTest() {
        Pro pro = getProRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        pro.addForexBrokers(forexBrokerBack);
        assertThat(pro.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPros()).containsOnly(pro);

        pro.removeForexBrokers(forexBrokerBack);
        assertThat(pro.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPros()).doesNotContain(pro);

        pro.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(pro.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPros()).containsOnly(pro);

        pro.setForexBrokers(new HashSet<>());
        assertThat(pro.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPros()).doesNotContain(pro);
    }
}
