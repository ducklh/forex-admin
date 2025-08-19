package com.actionnow.knetwork.domain;

import java.util.UUID;

public class SiteNewsArticleTestSamples {

    public static SiteNewsArticle getSiteNewsArticleSample1() {
        return new SiteNewsArticle()
            .id("id1")
            .title("title1")
            .titleEn("titleEn1")
            .excerpt("excerpt1")
            .excerptEn("excerptEn1")
            .category("category1")
            .categoryEn("categoryEn1")
            .author("author1")
            .readTime("readTime1")
            .image("image1");
    }

    public static SiteNewsArticle getSiteNewsArticleSample2() {
        return new SiteNewsArticle()
            .id("id2")
            .title("title2")
            .titleEn("titleEn2")
            .excerpt("excerpt2")
            .excerptEn("excerptEn2")
            .category("category2")
            .categoryEn("categoryEn2")
            .author("author2")
            .readTime("readTime2")
            .image("image2");
    }

    public static SiteNewsArticle getSiteNewsArticleRandomSampleGenerator() {
        return new SiteNewsArticle()
            .id(UUID.randomUUID().toString())
            .title(UUID.randomUUID().toString())
            .titleEn(UUID.randomUUID().toString())
            .excerpt(UUID.randomUUID().toString())
            .excerptEn(UUID.randomUUID().toString())
            .category(UUID.randomUUID().toString())
            .categoryEn(UUID.randomUUID().toString())
            .author(UUID.randomUUID().toString())
            .readTime(UUID.randomUUID().toString())
            .image(UUID.randomUUID().toString());
    }
}
