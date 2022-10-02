package org.bambrikii.lang.pagetranslator.export.evernote;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
public class EvernoteImportTest {

    @Test
    public void shouldRun() throws IOException {
        String username = System.getProperty("evernote-username");
        String password = System.getProperty("evernote-password");

        new EvernoteCommand()
                .init(username, password)
                .login()
                .am()
                .listNotes()
                .close();
    }
}
