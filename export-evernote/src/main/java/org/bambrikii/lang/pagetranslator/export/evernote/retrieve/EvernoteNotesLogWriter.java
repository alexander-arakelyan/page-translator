package org.bambrikii.lang.pagetranslator.export.evernote.retrieve;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class EvernoteNotesLogWriter implements EvernoteNotesWriter {
    private BufferedWriter writer;
    private final String fileName;

    public EvernoteNotesLogWriter(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public EvernoteNotesLogWriter open() throws IOException {
        this.writer = new BufferedWriter(new FileWriter(fileName));
        return this;
    }

    @Override
    public EvernoteNotesLogWriter append(String header, String content) throws IOException {
        writeLine(header);
        writeLine("---");
        writeLine(content);
        writeLine("---------");
        writer.flush();
        return this;
    }

    private void writeLine(String str) throws IOException {
        writer.write(str);
        writer.newLine();
    }

    @Override
    public EvernoteNotesLogWriter close() throws IOException {
        writer.flush();
        writer.close();
        writer = null;
        return this;
    }
}
