package com.studenthub.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
    public class EncodedBlob {

    @JsonProperty("content")
    private String data;
    @JsonProperty("encoding")
    private String encodingString;

    public String getData() {
        return data;
    }

    public String getEncodingString() {
        return encodingString;
    }
}
