package org.bambrikii.lang.pagetranslator.export.evernote;

import org.bambrikii.lang.pagetranslator.export.evernote.convert.EvernoteNoteConverterCommand;
import org.bambrikii.lang.pagetranslator.export.evernote.retrieve.EvernoteCommand;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class EvernoteImportTest {

    //    @Test
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

    @Test
    public void shouldConvert() {
        var cmd = new EvernoteNoteConverterCommand()
                .init(EvernoteImportTest.class.getResource("evernote-notes.json").getFile())
                .convert()
                .saveTo("build/converted.json");

        cmd.getConverted().getWords().forEach(elem -> System.out.println("-> " + elem));

        assertThat(cmd).extracting("converted.words").isNotEmpty();
        assertThat(new File("build/converted.json").exists()).isTrue();
    }
}
