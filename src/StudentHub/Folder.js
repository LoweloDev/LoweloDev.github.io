class Folder {
    name;
    type;
    html_url;
    download_url;
    child;

    constructor(name, type, html_url, download_url, child) {
        this.name = name;
        this.type = type;
        this.html_url = html_url;
        this.download_url = download_url;
        this.child = child;
    }
}

export default Folder;