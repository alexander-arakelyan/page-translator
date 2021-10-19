package org.bambrikii.lang.pagetranslator.usage;

import lombok.Getter;
import lombok.Setter;
import org.bambrikii.lang.pagetranslator.words.WordDto;

@Getter
@Setter
public class UsageClient {
    private Long id;
    private WordDto word;
    private Integer searchCount;
}
