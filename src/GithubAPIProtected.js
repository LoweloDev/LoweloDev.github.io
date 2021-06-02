class GithubAPIProtected {
    user;
    auth = {Authorization: ""};
    methods = {
        GET: {
            method: "GET", headers: this.auth
        }
    }

    constructor(token, user) {
        this.auth.Authorization = token;
        this.user = user;
    }

    async getRepos() {
        const promise = await fetch("https://api.github.com/users/" + this.user + "/repos");

        return promise.json();
    }
}

export default GithubAPIProtected;
