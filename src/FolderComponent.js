import React from 'react';
import RepoAPI from "./RepoAPI";

class FolderComponent extends React.Component {

    componentWillMount() {
        const githubrepos = new RepoAPI("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", "LoweloDev");

        githubrepos.getFolders("University", "")
            .then(item => {
                this.setState(item)
            })
        console.log(githubrepos.getContents("University", ""));
    }

    render() {
        if (this.state === null) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <React.Fragment>
                    {Object.entries(this.state).map(([key, value]) => {
                        return (
                            <React.Fragment>
                                <div>{value.name}</div>
                                <div>{value.type}</div>
                                <a href={value.download_url}>Download</a>
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>);
        }
    }

}

export default FolderComponent;