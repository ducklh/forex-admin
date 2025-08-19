package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.KnowledgeItemTestSamples.*;
import static com.actionnow.knetwork.domain.KnowledgeTagTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class KnowledgeTagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KnowledgeTag.class);
        KnowledgeTag knowledgeTag1 = getKnowledgeTagSample1();
        KnowledgeTag knowledgeTag2 = new KnowledgeTag();
        assertThat(knowledgeTag1).isNotEqualTo(knowledgeTag2);

        knowledgeTag2.setId(knowledgeTag1.getId());
        assertThat(knowledgeTag1).isEqualTo(knowledgeTag2);

        knowledgeTag2 = getKnowledgeTagSample2();
        assertThat(knowledgeTag1).isNotEqualTo(knowledgeTag2);
    }

    @Test
    void knowledgeItemsTest() {
        KnowledgeTag knowledgeTag = getKnowledgeTagRandomSampleGenerator();
        KnowledgeItem knowledgeItemBack = getKnowledgeItemRandomSampleGenerator();

        knowledgeTag.addKnowledgeItems(knowledgeItemBack);
        assertThat(knowledgeTag.getKnowledgeItems()).containsOnly(knowledgeItemBack);
        assertThat(knowledgeItemBack.getTags()).containsOnly(knowledgeTag);

        knowledgeTag.removeKnowledgeItems(knowledgeItemBack);
        assertThat(knowledgeTag.getKnowledgeItems()).doesNotContain(knowledgeItemBack);
        assertThat(knowledgeItemBack.getTags()).doesNotContain(knowledgeTag);

        knowledgeTag.knowledgeItems(new HashSet<>(Set.of(knowledgeItemBack)));
        assertThat(knowledgeTag.getKnowledgeItems()).containsOnly(knowledgeItemBack);
        assertThat(knowledgeItemBack.getTags()).containsOnly(knowledgeTag);

        knowledgeTag.setKnowledgeItems(new HashSet<>());
        assertThat(knowledgeTag.getKnowledgeItems()).doesNotContain(knowledgeItemBack);
        assertThat(knowledgeItemBack.getTags()).doesNotContain(knowledgeTag);
    }
}
