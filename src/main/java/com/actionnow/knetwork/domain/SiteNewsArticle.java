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
 * A SiteNewsArticle.
 */
@Document(collection = "site_news_article")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SiteNewsArticle implements Serializable {

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

    @Field("author")
    private String author;

    @Field("published_at")
    private Instant publishedAt;

    @Field("read_time")
    private String readTime;

    @Field("image")
    private String image;

    @Field("full_content")
    private String fullContent;

    @Field("full_content_en")
    private String fullContentEn;

    @DBRef
    @Field("tags")
    @JsonIgnoreProperties(value = { "siteNewsArticles" }, allowSetters = true)
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public SiteNewsArticle id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public SiteNewsArticle title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleEn() {
        return this.titleEn;
    }

    public SiteNewsArticle titleEn(String titleEn) {
        this.setTitleEn(titleEn);
        return this;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public String getExcerpt() {
        return this.excerpt;
    }

    public SiteNewsArticle excerpt(String excerpt) {
        this.setExcerpt(excerpt);
        return this;
    }

    public void setExcerpt(String excerpt) {
        this.excerpt = excerpt;
    }

    public String getExcerptEn() {
        return this.excerptEn;
    }

    public SiteNewsArticle excerptEn(String excerptEn) {
        this.setExcerptEn(excerptEn);
        return this;
    }

    public void setExcerptEn(String excerptEn) {
        this.excerptEn = excerptEn;
    }

    public String getContent() {
        return this.content;
    }

    public SiteNewsArticle content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentEn() {
        return this.contentEn;
    }

    public SiteNewsArticle contentEn(String contentEn) {
        this.setContentEn(contentEn);
        return this;
    }

    public void setContentEn(String contentEn) {
        this.contentEn = contentEn;
    }

    public String getCategory() {
        return this.category;
    }

    public SiteNewsArticle category(String category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategoryEn() {
        return this.categoryEn;
    }

    public SiteNewsArticle categoryEn(String categoryEn) {
        this.setCategoryEn(categoryEn);
        return this;
    }

    public void setCategoryEn(String categoryEn) {
        this.categoryEn = categoryEn;
    }

    public String getAuthor() {
        return this.author;
    }

    public SiteNewsArticle author(String author) {
        this.setAuthor(author);
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Instant getPublishedAt() {
        return this.publishedAt;
    }

    public SiteNewsArticle publishedAt(Instant publishedAt) {
        this.setPublishedAt(publishedAt);
        return this;
    }

    public void setPublishedAt(Instant publishedAt) {
        this.publishedAt = publishedAt;
    }

    public String getReadTime() {
        return this.readTime;
    }

    public SiteNewsArticle readTime(String readTime) {
        this.setReadTime(readTime);
        return this;
    }

    public void setReadTime(String readTime) {
        this.readTime = readTime;
    }

    public String getImage() {
        return this.image;
    }

    public SiteNewsArticle image(String image) {
        this.setImage(image);
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getFullContent() {
        return this.fullContent;
    }

    public SiteNewsArticle fullContent(String fullContent) {
        this.setFullContent(fullContent);
        return this;
    }

    public void setFullContent(String fullContent) {
        this.fullContent = fullContent;
    }

    public String getFullContentEn() {
        return this.fullContentEn;
    }

    public SiteNewsArticle fullContentEn(String fullContentEn) {
        this.setFullContentEn(fullContentEn);
        return this;
    }

    public void setFullContentEn(String fullContentEn) {
        this.fullContentEn = fullContentEn;
    }

    public Set<Tag> getTags() {
        return this.tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public SiteNewsArticle tags(Set<Tag> tags) {
        this.setTags(tags);
        return this;
    }

    public SiteNewsArticle addTags(Tag tag) {
        this.tags.add(tag);
        return this;
    }

    public SiteNewsArticle removeTags(Tag tag) {
        this.tags.remove(tag);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SiteNewsArticle)) {
            return false;
        }
        return getId() != null && getId().equals(((SiteNewsArticle) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SiteNewsArticle{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", titleEn='" + getTitleEn() + "'" +
            ", excerpt='" + getExcerpt() + "'" +
            ", excerptEn='" + getExcerptEn() + "'" +
            ", content='" + getContent() + "'" +
            ", contentEn='" + getContentEn() + "'" +
            ", category='" + getCategory() + "'" +
            ", categoryEn='" + getCategoryEn() + "'" +
            ", author='" + getAuthor() + "'" +
            ", publishedAt='" + getPublishedAt() + "'" +
            ", readTime='" + getReadTime() + "'" +
            ", image='" + getImage() + "'" +
            ", fullContent='" + getFullContent() + "'" +
            ", fullContentEn='" + getFullContentEn() + "'" +
            "}";
    }
}
