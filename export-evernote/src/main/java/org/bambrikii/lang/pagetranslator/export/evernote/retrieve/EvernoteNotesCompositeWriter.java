package org.bambrikii.lang.pagetranslator.export.evernote.retrieve;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class EvernoteNotesCompositeWriter implements EvernoteNotesWriter {
    private List<EvernoteNotesWriter> writers = new ArrayList<>();

    public EvernoteNotesCompositeWriter json(String fileName) {
        writers.add(new EvernoteNotesJsonWriter(fileName));
        return this;
    }

    public EvernoteNotesCompositeWriter log(String fileName) {
        writers.add(new EvernoteNotesLogWriter(fileName));
        return this;
    }

    @Override
    public EvernoteNotesCompositeWriter open() throws IOException {
        for (EvernoteNotesWriter writer : writers) {
            writer.open();
        }
        return this;
    }

    @Override
    public EvernoteNotesCompositeWriter append(String header, String content) throws IOException {
        for (EvernoteNotesWriter writer : writers) {
            writer.append(header, content);
        }
        return this;
    }

    @Override
    public EvernoteNotesCompositeWriter close() throws IOException {
        for (EvernoteNotesWriter writer : writers) {
            writer.close();
        }
        return this;
    }
}
