package org.bambrikii.lang.pagetranslator.usage;

import lombok.Getter;
import lombok.Setter;
import org.bambrikii.lang.pagetranslator.words.WordClient;

@Getter
@Setter
public class UsageClient {
    private Long id;
    private WordClient word;
    private Integer searchCount;
}
