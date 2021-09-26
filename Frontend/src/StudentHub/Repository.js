import GithubAPICore from "./GithubAPICore";
import Folder from "./Folder";

class Repository extends GithubAPICore {
    
    async getFolders(repository, path) {
        const promise = await this.getContents(repository, path);
        return promise.map(item => {
            if (item.type === "dir")
                return new Folder(item.name, item.type, item.html_url, `https://download-directory.github.io/?url=${item.html_url}`)
            })
            .filter(item => item !== undefined);
    }

    async getFoldersWithChild(repository, path) {
        let folders = await this.getContents(repository, path);
        folders = await Promise.all(folders.map(async item => {
            if (item.type === "dir")
                return new Folder(item.name, item.type, item.html_url, `https://download-directory.github.io/?url=${item.html_url}`, await this.getFolders(repository, item.name))
        }))
        return folders.filter(item => item !== undefined);
    }
}

export default Repository;
