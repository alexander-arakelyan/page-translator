package org.bambrikii.lang.pagetranslator.export.services;

import org.bambrikii.lang.pagetranslator.export.model.ImportContainer;
import org.bambrikii.lang.pagetranslator.export.model.ExportArticle;
import org.bambrikii.lang.pagetranslator.export.model.ExportArticleWord;
import org.bambrikii.lang.pagetranslator.export.model.ExportContainer;
import org.bambrikii.lang.pagetranslator.export.model.ExportTag;
import org.bambrikii.lang.pagetranslator.export.model.ExportWord;
import org.bambrikii.lang.pagetranslator.orm.Article;
import org.bambrikii.lang.pagetranslator.orm.ArticleRepository;
import org.bambrikii.lang.pagetranslator.orm.ArticleWord;
import org.bambrikii.lang.pagetranslator.orm.Tag;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ExportService {
    private final ArticleRepository articleRepository;
    private final WordRepository wordRepository;

    public ExportService(ArticleRepository articleRepository, WordRepository wordRepository) {
        this.articleRepository = articleRepository;
        this.wordRepository = wordRepository;
    }

    public ExportContainer export() {
        ExportContainer exportContainer = new ExportContainer();

        exportContainer.setWords(StreamSupport
                .stream(wordRepository.findAll().spliterator(), false)
                .map(this::mapWord)
                .collect(Collectors.toList()));

        exportContainer.setArticles(StreamSupport
                .stream(articleRepository.findAll().spliterator(), false)
                .map(this::mapArticle)
                .collect(Collectors.toList()));

        return exportContainer;
    }

    private ExportArticle mapArticle(Article article) {
        ExportArticle exportArticle = new ExportArticle();
        exportArticle.setContent(article.getContent());
        exportArticle.setTitle(article.getTitle());
        exportArticle.setLink(article.getLink());
        exportArticle.setLanguageCode(article.getLang().getCode());
        exportArticle.setWords(article.getWords()
                .stream()
                .map(this::mapArticleWord)
                .collect(Collectors.toList())
        );
        return exportArticle;
    }

    private ExportArticleWord mapArticleWord(ArticleWord articleWord) {
        ExportArticleWord exportArticleWord = new ExportArticleWord();
        exportArticleWord.setName(articleWord.getWord().getName());
        exportArticleWord.setLanguageCode(articleWord.getWord().getLang().getCode());
        return exportArticleWord;
    }

    private ExportWord mapWord(Word word) {
        ExportWord exportWord = new ExportWord();
        exportWord.setName(word.getName());
        exportWord.setLanguageCode(word.getLang().getCode());
        exportWord.setTags(mapTags(word));
        return exportWord;
    }

    private List<ExportTag> mapTags(Word word) {
        return word
                .getTags()
                .stream()
                .map(tag -> mapTag(tag))
                .collect(Collectors.toList());
    }

    private ExportTag mapTag(Tag tag) {
        ExportTag exportTag = new ExportTag();
        exportTag.setName(tag.getName());
        exportTag.setLanguageCode(tag.getLang().getCode());
        return exportTag;
    }

    public ImportContainer import1(ImportContainer export) {
        // TODO:
        ensureWords(export.getWords());
        ensureArticles(export.getArticles());
        throw new UnsupportedOperationException("Not yet implemented");
    }

    private void ensureArticles(List<ExportArticle> exportArticles) {
        for (ExportArticle exportArticle : exportArticles) {
            ensureArticle(exportArticle.getLink(), exportArticle.getTitle(), exportArticle.getLanguageCode(), exportArticle.getContent());
            List<ExportArticleWord> exportWord = exportArticle.getWords();
            for (ExportArticleWord exportArticleWord : exportWord) {
                ensureWord(exportArticleWord.getName(), exportArticleWord.getLanguageCode());
            }
        }
    }

    private void ensureArticle(String link, String title, String languageCode, String content) {

    }

    private void ensureWords(List<ExportWord> exportWords) {
        for (ExportWord exportWord : exportWords) {
            String name = exportWord.getName();
            String languageCode = exportWord.getLanguageCode();
            Word word = ensureWord(name, languageCode);
            List<ExportTag> exportTags = exportWord.getTags();
            for (ExportTag exportTag : exportTags) {
                ensureTag(word, exportTag.getName(), exportTag.getLanguageCode());
            }
        }
    }

    private void ensureTag(Word word, String name, String languageCode) {

    }

    private Word ensureWord(String name, String languageCode) {
        return null;
    }
}
