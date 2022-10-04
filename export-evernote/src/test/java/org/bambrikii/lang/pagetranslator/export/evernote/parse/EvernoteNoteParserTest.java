package org.bambrikii.lang.pagetranslator.export.evernote.parse;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class EvernoteNoteParserTest {
    @Test
    public void shouldProcessMultiline() {
        String title = "նախնական";
        String content = "начальная,\nпарафировать,\nисходный,\n\noriginal,\ninitial,\nparent,";

        var actual = new EvernoteNoteParser()
                .parse(title, content);

        assertThat(actual).hasSize(1);
    }
}
