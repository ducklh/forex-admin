package com.actionnow.knetwork.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class KnowledgeItemTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static KnowledgeItem getKnowledgeItemSample1() {
        return new KnowledgeItem()
            .id("id1")
            .title("title1")
            .titleEn("titleEn1")
            .excerpt("excerpt1")
            .excerptEn("excerptEn1")
            .category("category1")
            .categoryEn("categoryEn1")
            .level("level1")
            .levelEn("levelEn1")
            .author("author1")
            .readTime(1)
            .image("image1");
    }

    public static KnowledgeItem getKnowledgeItemSample2() {
        return new KnowledgeItem()
            .id("id2")
            .title("title2")
            .titleEn("titleEn2")
            .excerpt("excerpt2")
            .excerptEn("excerptEn2")
            .category("category2")
            .categoryEn("categoryEn2")
            .level("level2")
            .levelEn("levelEn2")
            .author("author2")
            .readTime(2)
            .image("image2");
    }

    public static KnowledgeItem getKnowledgeItemRandomSampleGenerator() {
        return new KnowledgeItem()
            .id(UUID.randomUUID().toString())
            .title(UUID.randomUUID().toString())
            .titleEn(UUID.randomUUID().toString())
            .excerpt(UUID.randomUUID().toString())
            .excerptEn(UUID.randomUUID().toString())
            .category(UUID.randomUUID().toString())
            .categoryEn(UUID.randomUUID().toString())
            .level(UUID.randomUUID().toString())
            .levelEn(UUID.randomUUID().toString())
            .author(UUID.randomUUID().toString())
            .readTime(intCount.incrementAndGet())
            .image(UUID.randomUUID().toString());
    }
}
