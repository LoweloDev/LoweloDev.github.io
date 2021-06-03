import GithubAPIProtected from "./GithubAPIProtected";

class RepoAPI extends GithubAPIProtected {
    async getFolders(repository, path) {
        const promise = await this.getContents(repository, path);
        const folders = promise
            .map(item => {
                if (item.type === "dir") {
                    const result = {
                        name: item.name,
                        type: item.type,
                        download_url: "https://download-directory.github.io/?url=" + item.html_url,
                        html_url: item.html_url
                    }
                    return result;
                }
            })
            .filter(item => item !== undefined);
        return folders;
    }

    async getFoldersWithChild(repository, path) {
        let folders = await this.getContents(repository, path);
        folders = await Promise.all(folders.map(async item => {
            if (item.type === "dir") {
                const result = {
                    name: item.name,
                    type: item.type,
                    html_url: item.html_url,
                    download_url: "https://download-directory.github.io/?url=" + item.html_url,
                    child: await this.getFolders(repository, item.name)
                }
                return result;
            }
        }))
        return folders.filter(item => item !== undefined);
    }
}

export default RepoAPI;
