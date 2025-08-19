package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ConTestSamples.*;
import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ConTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Con.class);
        Con con1 = getConSample1();
        Con con2 = new Con();
        assertThat(con1).isNotEqualTo(con2);

        con2.setId(con1.getId());
        assertThat(con1).isEqualTo(con2);

        con2 = getConSample2();
        assertThat(con1).isNotEqualTo(con2);
    }

    @Test
    void forexBrokersTest() {
        Con con = getConRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        con.addForexBrokers(forexBrokerBack);
        assertThat(con.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexCons()).containsOnly(con);

        con.removeForexBrokers(forexBrokerBack);
        assertThat(con.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexCons()).doesNotContain(con);

        con.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(con.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexCons()).containsOnly(con);

        con.setForexBrokers(new HashSet<>());
        assertThat(con.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexCons()).doesNotContain(con);
    }
}
