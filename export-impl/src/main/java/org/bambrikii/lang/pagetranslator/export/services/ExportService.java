package org.bambrikii.lang.pagetranslator.export.services;

import org.bambrikii.lang.pagetranslator.export.model.ExportArticle;
import org.bambrikii.lang.pagetranslator.export.model.ExportArticleWord;
import org.bambrikii.lang.pagetranslator.export.model.ExportContainer;
import org.bambrikii.lang.pagetranslator.export.model.ExportTag;
import org.bambrikii.lang.pagetranslator.export.model.ExportWord;
import org.bambrikii.lang.pagetranslator.export.model.ImportContainer;
import org.bambrikii.lang.pagetranslator.orm.Article;
import org.bambrikii.lang.pagetranslator.orm.ArticleRepository;
import org.bambrikii.lang.pagetranslator.orm.ArticleWord;
import org.bambrikii.lang.pagetranslator.orm.Tag;
import org.bambrikii.lang.pagetranslator.orm.TagRepository;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.bambrikii.lang.translator.page.lang.orm.LangRepository;
import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.bambrikii.security.orm.User;
import org.bambrikii.security.orm.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ExportService {
    private final ArticleRepository articleRepository;
    private final WordRepository wordRepository;
    private final LangRepository langRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    public ExportService(
            ArticleRepository articleRepository,
            WordRepository wordRepository,
            LangRepository langRepository,
            UserRepository userRepository,
            TagRepository tagRepository
    ) {
        this.articleRepository = articleRepository;
        this.wordRepository = wordRepository;
        this.langRepository = langRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
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

    public ImportContainer import1(ImportContainer export, String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Not user [" + email + "] found ");
        }

        User user = userOptional.get();
        ensureWords(export.getWords(), user);
        ensureArticles(export.getArticles(), user);

        var response = new ImportContainer();
        response.setWords(export.getWords());
        response.setArticles(export.getArticles());
        return response;
    }

    private void ensureArticles(List<ExportArticle> exportArticles, User user) {
        if (exportArticles == null || exportArticles.isEmpty()) {
            return;
        }
        for (ExportArticle exportArticle : exportArticles) {
            ensureArticle(exportArticle.getLink(), exportArticle.getTitle(), exportArticle.getLanguageCode(), exportArticle.getContent());
            List<ExportArticleWord> exportWord = exportArticle.getWords();
            for (ExportArticleWord exportArticleWord : exportWord) {
                ensureWord(exportArticleWord.getName(), exportArticleWord.getLanguageCode(), user);
            }
        }
    }

    private void ensureArticle(String link, String title, String languageCode, String content) {

    }

    private void ensureWords(List<ExportWord> exportWords, User user) {
        if (exportWords == null || exportWords.isEmpty()) {
            return;
        }
        for (ExportWord exportWord : exportWords) {
            String name = exportWord.getName();
            String languageCode = exportWord.getLanguageCode();
            Word word = ensureWord(name, languageCode, user);
            List<ExportTag> exportTags = exportWord.getTags();
            for (ExportTag exportTag : exportTags) {
                ensureTag(word, exportTag.getName(), exportTag.getLanguageCode(), user);
            }
        }
    }

    private void ensureTag(Word word, String name, String languageCode, User user) {
        var tagOptional = word.getTags().stream().filter(tag -> name.equals(tag.getName())).findFirst();
        if (tagOptional.isPresent()) {
            return;
        }
        var tag = ensureTag(name, languageCode, user);
        word.getTags().add(tag);
        wordRepository.save(word);
    }

    private Tag ensureTag(String name, String languageCode, User user) {
        var lang = langRepository.findByCode(languageCode);
        var tagOptional = tagRepository.findByNameAndLang(name, lang);
        if (tagOptional.isPresent()) {
            return tagOptional.get();
        }
        var tag = new Tag();
        tag.setName(name);
        tag.setLang(lang);
        tag.setCreatedBy(user);
        tagRepository.save(tag);
        return tag;
    }

    private Word ensureWord(String name, String languageCode, User user) {
        Page<Word> words = wordRepository.findByNameLikeAndLangCode(name, languageCode, Pageable.unpaged());
        if (!words.isEmpty()) {
            return words.getContent().get(0);
        }
        // create word
        Language lang = langRepository.findByCode(languageCode);
        var word = new Word();
        word.setName(name);
        word.setLang(lang);
        word.setCreatedBy(user);
        wordRepository.save(word);
        return word;
    }
}
