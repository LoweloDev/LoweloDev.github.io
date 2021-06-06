class GithubAPICore {
    user;
    auth = {Authorization: ""};
    methods = {
        GET: {
            method: "GET",
        },
        POST: {
            method: "POST",
        }
    }

    constructor(token, user) {
        this.auth.Authorization = token;
        this.user = user;
    }

    async getRepos() {
        // const promise = await fetch("https://api.github.com/users/" + this.user + "/repos", this.methods.GET);
        const promise = await fetch(`https://api.github.com/users/${this.user}/repos`, this.methods.GET);

        return promise.json();
    }

    async getCommits(repository) {
        // const promise = await fetch("https://api.github.com/repos/LoweloDev/" + repository + "/commits", this.methods.GET);
        const promise = await fetch(`https://api.github.com/repos/${this.user}/${repository}/commits`, this.methods.GET);

        return promise.json();
    }

    async getLatestCommitOfBranch(repository, branch) {
        const promise = await fetch(`https://api.github.com/repos/${this.user}/${repository}/commits/${branch}`, this.methods.GET);

        return promise.json();
    }

    async getFileTree(repository) {
        const latestCommit = await this.getLatestCommitOfBranch(repository, "university_protected");
        const latestCommitSha = latestCommit.commit.tree.sha;

        // https://api.github.com/repos/{username}/{repoName}/trees/{latestCommitSha}
        const promise = await fetch(`https://api.github.com/repos/${this.user}/${repository}/git/trees/${latestCommitSha}`, this.methods.GET);

        return promise.json();
    }

    async getContents(repository, path) {
        const promise = await fetch(`https://api.github.com/repos/${this.user}/${repository}/contents/${path}`, this.methods.GET);

        return promise.json();
    }
}

export default GithubAPICore;
