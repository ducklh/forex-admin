package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.CustomerSupportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CustomerSupportTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerSupport.class);
        CustomerSupport customerSupport1 = getCustomerSupportSample1();
        CustomerSupport customerSupport2 = new CustomerSupport();
        assertThat(customerSupport1).isNotEqualTo(customerSupport2);

        customerSupport2.setId(customerSupport1.getId());
        assertThat(customerSupport1).isEqualTo(customerSupport2);

        customerSupport2 = getCustomerSupportSample2();
        assertThat(customerSupport1).isNotEqualTo(customerSupport2);
    }

    @Test
    void cryptoBrokersTest() {
        CustomerSupport customerSupport = getCustomerSupportRandomSampleGenerator();
        CryptoBroker cryptoBrokerBack = getCryptoBrokerRandomSampleGenerator();

        customerSupport.addCryptoBrokers(cryptoBrokerBack);
        assertThat(customerSupport.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCustomerSupports()).containsOnly(customerSupport);

        customerSupport.removeCryptoBrokers(cryptoBrokerBack);
        assertThat(customerSupport.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCustomerSupports()).doesNotContain(customerSupport);

        customerSupport.cryptoBrokers(new HashSet<>(Set.of(cryptoBrokerBack)));
        assertThat(customerSupport.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCustomerSupports()).containsOnly(customerSupport);

        customerSupport.setCryptoBrokers(new HashSet<>());
        assertThat(customerSupport.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCustomerSupports()).doesNotContain(customerSupport);
    }
}
