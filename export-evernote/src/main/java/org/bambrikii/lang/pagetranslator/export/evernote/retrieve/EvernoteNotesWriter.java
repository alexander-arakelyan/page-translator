package org.bambrikii.lang.pagetranslator.export.evernote.retrieve;

import java.io.IOException;

public interface EvernoteNotesWriter {
    EvernoteNotesWriter open() throws IOException;

    EvernoteNotesWriter append(String header, String content) throws IOException;

    EvernoteNotesWriter close() throws IOException;
}
