package org.bambrikii.lang.pagetranslator.articleword;

import lombok.Getter;
import lombok.Setter;
import org.bambrikii.lang.pagetranslator.words.TagDto;

import java.util.List;

@Getter
@Setter
public class ArticleWordDto {
    private Long id;
    private Long articleId;
    private Long wordId;
    private String wordName;
    private String langCode;
    private String langName;
    private Integer count;
    private List<TagDto> tags;

    public void setTags(List<TagDto> tags) {
        this.tags = tags;
    }

    public List<TagDto> getTags() {
        return tags;
    }
}
