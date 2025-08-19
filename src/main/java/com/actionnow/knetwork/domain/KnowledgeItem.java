package com.actionnow.knetwork.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A KnowledgeItem.
 */
@Document(collection = "knowledge_item")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class KnowledgeItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("title")
    private String title;

    @Field("title_en")
    private String titleEn;

    @Field("excerpt")
    private String excerpt;

    @Field("excerpt_en")
    private String excerptEn;

    @Field("content")
    private String content;

    @Field("content_en")
    private String contentEn;

    @Field("category")
    private String category;

    @Field("category_en")
    private String categoryEn;

    @Field("level")
    private String level;

    @Field("level_en")
    private String levelEn;

    @Field("author")
    private String author;

    @Field("published_at")
    private Instant publishedAt;

    @Field("read_time")
    private Integer readTime;

    @Field("image")
    private String image;

    @DBRef
    @Field("tags")
    @JsonIgnoreProperties(value = { "knowledgeItems" }, allowSetters = true)
    private Set<KnowledgeTag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public KnowledgeItem id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public KnowledgeItem title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleEn() {
        return this.titleEn;
    }

    public KnowledgeItem titleEn(String titleEn) {
        this.setTitleEn(titleEn);
        return this;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getExcerpt() {
        return this.excerpt;
    }

    public KnowledgeItem excerpt(String excerpt) {
        this.setExcerpt(excerpt);
        return this;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public String getExcerptEn() {
        return this.excerptEn;
    }

    public KnowledgeItem excerptEn(String excerptEn) {
        this.setExcerptEn(excerptEn);
        return this;
    }

    public void setExcerptEn(String excerptEn) {
        this.excerptEn = excerptEn;
    }

    public String getContent() {
        return this.content;
    }

    public KnowledgeItem content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentEn() {
        return this.contentEn;
    }

    public KnowledgeItem contentEn(String contentEn) {
        this.setContentEn(contentEn);
        return this;
    }

    public void setContentEn(String contentEn) {
        this.contentEn = contentEn;
    }

    public String getCategory() {
        return this.category;
    }

    public KnowledgeItem category(String category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryEn() {
        return this.categoryEn;
    }

    public KnowledgeItem categoryEn(String categoryEn) {
        this.setCategoryEn(categoryEn);
        return this;
    }

    public void setCategoryEn(String categoryEn) {
        this.categoryEn = categoryEn;
    }

    public String getLevel() {
        return this.level;
    }

    public KnowledgeItem level(String level) {
        this.setLevel(level);
        return this;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getLevelEn() {
        return this.levelEn;
    }

    public KnowledgeItem levelEn(String levelEn) {
        this.setLevelEn(levelEn);
        return this;
    }

    public void setLevelEn(String levelEn) {
        this.levelEn = levelEn;
    }

    public String getAuthor() {
        return this.author;
    }

    public KnowledgeItem author(String author) {
        this.setAuthor(author);
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Instant getPublishedAt() {
        return this.publishedAt;
    }

    public KnowledgeItem publishedAt(Instant publishedAt) {
        this.setPublishedAt(publishedAt);
        return this;
    }

    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }

    public Integer getReadTime() {
        return this.readTime;
    }

    public KnowledgeItem readTime(Integer readTime) {
        this.setReadTime(readTime);
        return this;
    }

    public void setReadTime(Integer readTime) {
        this.readTime = readTime;
    }

    public String getImage() {
        return this.image;
    }

    public KnowledgeItem image(String image) {
        this.setImage(image);
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<KnowledgeTag> getTags() {
        return this.tags;
    }

    public void setTags(Set<KnowledgeTag> knowledgeTags) {
        this.tags = knowledgeTags;
    }

    public KnowledgeItem tags(Set<KnowledgeTag> knowledgeTags) {
        this.setTags(knowledgeTags);
        return this;
    }

    public KnowledgeItem addTags(KnowledgeTag knowledgeTag) {
        this.tags.add(knowledgeTag);
        return this;
    }

    public KnowledgeItem removeTags(KnowledgeTag knowledgeTag) {
        this.tags.remove(knowledgeTag);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KnowledgeItem)) {
            return false;
        }
        return getId() != null && getId().equals(((KnowledgeItem) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KnowledgeItem{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", titleEn='" + getTitleEn() + "'" +
            ", excerpt='" + getExcerpt() + "'" +
            ", excerptEn='" + getExcerptEn() + "'" +
            ", content='" + getContent() + "'" +
            ", contentEn='" + getContentEn() + "'" +
            ", category='" + getCategory() + "'" +
            ", categoryEn='" + getCategoryEn() + "'" +
            ", level='" + getLevel() + "'" +
            ", levelEn='" + getLevelEn() + "'" +
            ", author='" + getAuthor() + "'" +
            ", publishedAt='" + getPublishedAt() + "'" +
            ", readTime=" + getReadTime() +
            ", image='" + getImage() + "'" +
            "}";
    }
}
