package org.bambrikii.lang.pagetranslator.export.evernote.convert;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.bambrikii.lang.pagetranslator.export.evernote.parse.EvernoteNoteParser;
import org.bambrikii.lang.pagetranslator.export.model.ExportContainer;
import org.bambrikii.lang.pagetranslator.export.model.ExportWord;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class EvernoteNoteConverterCommand {
    private Gson gson;
    private String fileName;
    private ExportContainer converted;

    public EvernoteNoteConverterCommand init(String fileName) {
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        this.fileName = fileName;
        return this;
    }

    public EvernoteNoteConverterCommand convert() {
        try (
                var fileInputStream = new FileInputStream(fileName);
                var bufferedInputStream = new BufferedInputStream(fileInputStream)
        ) {
            var parser = new EvernoteNoteParser();
            var contents = gson.fromJson(new BufferedReader(new InputStreamReader(bufferedInputStream)), EvernoteNotesContainer.class);
            Map<String, ExportWord> map = new ConcurrentHashMap<>();
            contents
                    .parallelStream()
                    .map(content -> parser.parse(content.getName(), content.getValue()))
                    .flatMap(exportWords -> exportWords.stream())
                    .forEach(exportWord -> {
                        var name = exportWord.getName();
                        if (map.containsKey(name)) {
                            map.get(name).getTags().addAll(exportWord.getTags());
                        } else {
                            map.put(name, exportWord);
                        }
                    });

            var result = new ExportContainer();
            result.setWords(new ArrayList<>());
            result.getWords().addAll(map.values());
            this.converted = result;
            return this;
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    public EvernoteNoteConverterCommand saveTo(String fileName) {
        try (var writer = new PrintWriter(fileName)) {
            writer.write(gson.toJson(converted));
            return this;
        } catch (FileNotFoundException ex) {
            throw new RuntimeException(ex);
        }
    }

    public ExportContainer getConverted() {
        return converted;
    }
}
