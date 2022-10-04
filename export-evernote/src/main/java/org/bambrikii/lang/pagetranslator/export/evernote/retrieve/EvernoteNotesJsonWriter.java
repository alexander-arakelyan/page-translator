package org.bambrikii.lang.pagetranslator.export.evernote.retrieve;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonWriter;

import java.io.FileWriter;
import java.io.IOException;

public class EvernoteNotesJsonWriter implements EvernoteNotesWriter {
    private final Gson gson;
    private final String fileName;
    private JsonWriter writer;

    public EvernoteNotesJsonWriter(String fileName) {
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        this.fileName = fileName;
    }

    @Override
    public EvernoteNotesJsonWriter open() throws IOException {
        this.writer = new JsonWriter(new FileWriter(fileName));
        writer.beginArray();
        writer.flush();
        return this;
    }

    @Override
    public EvernoteNotesJsonWriter append(String header, String content) throws IOException {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("name", header);
        jsonObject.addProperty("value", content);
        gson.toJson(jsonObject, writer);
        writer.flush();
        return this;
    }

    @Override
    public EvernoteNotesJsonWriter close() throws IOException {
        writer.endArray();
        writer.flush();
        writer.close();
        return this;
    }
}
