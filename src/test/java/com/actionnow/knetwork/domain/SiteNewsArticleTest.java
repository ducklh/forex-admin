package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.SiteNewsArticleTestSamples.*;
import static com.actionnow.knetwork.domain.TagTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class SiteNewsArticleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SiteNewsArticle.class);
        SiteNewsArticle siteNewsArticle1 = getSiteNewsArticleSample1();
        SiteNewsArticle siteNewsArticle2 = new SiteNewsArticle();
        assertThat(siteNewsArticle1).isNotEqualTo(siteNewsArticle2);

        siteNewsArticle2.setId(siteNewsArticle1.getId());
        assertThat(siteNewsArticle1).isEqualTo(siteNewsArticle2);

        siteNewsArticle2 = getSiteNewsArticleSample2();
        assertThat(siteNewsArticle1).isNotEqualTo(siteNewsArticle2);
    }

    @Test
    void tagsTest() {
        SiteNewsArticle siteNewsArticle = getSiteNewsArticleRandomSampleGenerator();
        Tag tagBack = getTagRandomSampleGenerator();

        siteNewsArticle.addTags(tagBack);
        assertThat(siteNewsArticle.getTags()).containsOnly(tagBack);

        siteNewsArticle.removeTags(tagBack);
        assertThat(siteNewsArticle.getTags()).doesNotContain(tagBack);

        siteNewsArticle.tags(new HashSet<>(Set.of(tagBack)));
        assertThat(siteNewsArticle.getTags()).containsOnly(tagBack);

        siteNewsArticle.setTags(new HashSet<>());
        assertThat(siteNewsArticle.getTags()).doesNotContain(tagBack);
    }
}
