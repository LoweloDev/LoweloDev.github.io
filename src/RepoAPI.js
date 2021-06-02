import GithubAPIProtected from "./GithubAPIProtected";

class RepoAPI extends GithubAPIProtected {

    async getCommits(repository) {
        const promise = await fetch("https://api.github.com/repos/LoweloDev/" + repository + "/commits");

        return promise.json();
    }

    async getLatestCommitOfBranch(repository, branch) {
        const promise = await fetch("https://api.github.com/repos/" + this.user + "/" + repository + "/commits/" + branch);

        return promise.json();
    }

    async getFileTree(repository) {
        const latestCommit = await this.getLatestCommitOfBranch(repository, "university_protected");
        const latestCommitSha = latestCommit.commit.tree.sha;

        // https://api.github.com/repos/{username}/{repoName}/trees/{latestCommitSha}
        const promise = await fetch("https://api.github.com/repos/" + this.user + "/" + repository + "/git/trees/" + latestCommitSha);

        return promise.json();
    }

    async getContents(repository, path) {
        const promise = await fetch("https://api.github.com/repos/" + this.user + "/" + repository + "/contents/" + path);

        return promise.json();
    }

    async getFolders(repository, path) {
        const promise = await this.getContents(repository, path);
        const folders = promise
            .map(item => {
                if (item.type === "dir") {
                    const result = {
                        name: item.name,
                        type: item.type,
                        download_url: "https://download-directory.github.io/?url=" + item.html_url
                    }
                    return result;
                }
            })
            .filter(item => item !== undefined);
        return folders;
    }

    mergeToTree() {

    }

    // async getFileTreeByDepth(repository, path, depth) {
    //     //TODO parent ( if null -> name), path: "/" + name
    //     let fileTree = [];
    //     let previous;
    //
    //     for (depth; depth > 0; depth--) {
    //         const folders = await this.getFolders(repository, path);
    //         folders.map( (item, index) => {
    //             const result = {
    //                 name: item.name,
    //                 type: item.type,
    //                 download_url: "https://download-directory.github.io/?url=" + item.html_url,
    //                 parent: previous,
    //                 relativePath: path + item.name,
    //                 child: this.getFileTreeByDepth(repository, (result) ? result.relativePath : path + item.name)
    //             }
    //             // console.log(result.relativePath)
    //             previous =
    //             fileTree.push(result)
    //         })
    //     }
    //     // console.log(await fileTree)
    // }
}

export default RepoAPI;
