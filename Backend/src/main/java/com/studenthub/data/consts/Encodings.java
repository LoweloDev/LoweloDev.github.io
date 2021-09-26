package com.studenthub.data.consts;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public enum Encodings {
    BASE_64("base64");

    private String name;

    private static final Map<String,Encodings> ENUM_MAP;

    Encodings (String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    static {
        Map<String,Encodings> map = new ConcurrentHashMap<String, Encodings>();
        for (Encodings instance : Encodings.values()) {
            map.put(instance.getName().toLowerCase(),instance);
        }
        ENUM_MAP = Collections.unmodifiableMap(map);
    }

    public static Encodings get (String name) {
        return ENUM_MAP.get(name.toLowerCase());
    }
}