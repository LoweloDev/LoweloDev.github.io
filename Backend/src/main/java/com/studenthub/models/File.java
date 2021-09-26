package com.studenthub.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class File {
    // TODO make sha ID if possible i.e. generate sha for new files
    private @Id @GeneratedValue long id;
    @JsonProperty("path")
    private String name;
    @JsonProperty("type")
    private String type;
    @JsonProperty("size")
    private int size;
    @JsonProperty("tree")
    // TODO learn cascade Type
    @OneToMany(cascade = CascadeType.ALL)
    private List<File> tree;
    @JsonProperty("url")
    private String url;
    private String treeReferenceId;
    private String realPath;
    @Lob
    private byte[] data;
    @JsonProperty("sha")
    private String sha;


    // TODO check emtpy constructor necessary
    public File(){};

    public String getSha() {
        return sha;
    }

    public String getRealPath() {
        return realPath;
    }

    public void setRealPath(String path) {
        this.realPath = path;
    }

    public String getUrl() {
        return url;
    }

    public long getId() {
        return id;
    }

    public List<File> getTree() {
        return tree;
    }

    public String getType() {
        return type;
    }

    public void setTreeReferenceId(String refId) {
        this.treeReferenceId = refId;
    }

    public String getTreeReferenceId() {
        return treeReferenceId;
    }

    public String getName() {
        return name;
    }

    public void setTree(List<File> tree) {
        this.tree = tree;
    }

    public int getSize() {
        return size;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public byte[] getData() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        File file = (File) o;
        return id == file.id && size == file.size && Objects.equals(name, file.name) && Objects.equals(type, file.type) && Objects.equals(tree, file.tree) && Objects.equals(url, file.url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, size, tree, url);
    }

    @Override
    public String toString() {
        return "File{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", size=" + size +
                ", tree=" + tree +
                '}';
    }
}
