package org.bambrikii.lang.pagetranslator.usage;

import org.bambrikii.lang.pagetranslator.orm.Usage;
import org.bambrikii.lang.pagetranslator.words.WordClient;
import org.bambrikii.lang.pagetranslator.words.WordConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsageConverter {
    @Autowired
    private WordConverter wordConverter;

    public UsageClient toClient(Usage usage) {
        UsageClient client = new UsageClient();
        client.setId(usage.getId());
        WordClient wordClient = wordConverter.toClient(usage.getWord());
        client.setWord(wordClient);
        client.setSearchCount(usage.getSearchCount());
        return client;
    }
}
