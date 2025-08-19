package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.KnowledgeItemTestSamples.*;
import static com.actionnow.knetwork.domain.KnowledgeTagTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class KnowledgeItemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KnowledgeItem.class);
        KnowledgeItem knowledgeItem1 = getKnowledgeItemSample1();
        KnowledgeItem knowledgeItem2 = new KnowledgeItem();
        assertThat(knowledgeItem1).isNotEqualTo(knowledgeItem2);

        knowledgeItem2.setId(knowledgeItem1.getId());
        assertThat(knowledgeItem1).isEqualTo(knowledgeItem2);

        knowledgeItem2 = getKnowledgeItemSample2();
        assertThat(knowledgeItem1).isNotEqualTo(knowledgeItem2);
    }

    @Test
    void tagsTest() {
        KnowledgeItem knowledgeItem = getKnowledgeItemRandomSampleGenerator();
        KnowledgeTag knowledgeTagBack = getKnowledgeTagRandomSampleGenerator();

        knowledgeItem.addTags(knowledgeTagBack);
        assertThat(knowledgeItem.getTags()).containsOnly(knowledgeTagBack);

        knowledgeItem.removeTags(knowledgeTagBack);
        assertThat(knowledgeItem.getTags()).doesNotContain(knowledgeTagBack);

        knowledgeItem.tags(new HashSet<>(Set.of(knowledgeTagBack)));
        assertThat(knowledgeItem.getTags()).containsOnly(knowledgeTagBack);

        knowledgeItem.setTags(new HashSet<>());
        assertThat(knowledgeItem.getTags()).doesNotContain(knowledgeTagBack);
    }
}
