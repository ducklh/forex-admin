package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.SiteNewsArticleTestSamples.*;
import static com.actionnow.knetwork.domain.TagTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tag.class);
        Tag tag1 = getTagSample1();
        Tag tag2 = new Tag();
        assertThat(tag1).isNotEqualTo(tag2);

        tag2.setId(tag1.getId());
        assertThat(tag1).isEqualTo(tag2);

        tag2 = getTagSample2();
        assertThat(tag1).isNotEqualTo(tag2);
    }

    @Test
    void siteNewsArticlesTest() {
        Tag tag = getTagRandomSampleGenerator();
        SiteNewsArticle siteNewsArticleBack = getSiteNewsArticleRandomSampleGenerator();

        tag.addSiteNewsArticles(siteNewsArticleBack);
        assertThat(tag.getSiteNewsArticles()).containsOnly(siteNewsArticleBack);
        assertThat(siteNewsArticleBack.getTags()).containsOnly(tag);

        tag.removeSiteNewsArticles(siteNewsArticleBack);
        assertThat(tag.getSiteNewsArticles()).doesNotContain(siteNewsArticleBack);
        assertThat(siteNewsArticleBack.getTags()).doesNotContain(tag);

        tag.siteNewsArticles(new HashSet<>(Set.of(siteNewsArticleBack)));
        assertThat(tag.getSiteNewsArticles()).containsOnly(siteNewsArticleBack);
        assertThat(siteNewsArticleBack.getTags()).containsOnly(tag);

        tag.setSiteNewsArticles(new HashSet<>());
        assertThat(tag.getSiteNewsArticles()).doesNotContain(siteNewsArticleBack);
        assertThat(siteNewsArticleBack.getTags()).doesNotContain(tag);
    }
}
