import React from "react";
import DirectoryComponent from "./DirectoryComponent";
import RepoAPI from "./RepoAPI";

class FileManagerComponent extends React.Component {

    componentWillMount() {
        const git = new RepoAPI("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", "LoweloDev");

        git.getFoldersWithChild("University", "")
            .then(item => {
                this.setState(item.reduce((acc,currItem) => (acc[currItem.name]= currItem, acc),{}))
            })
    }

    render() {
        if (this.state !== null) {
        return (
            <DirectoryComponent state={this.state}/>
        );
        } else {
            return <div>Loading ...</div>
        }
    }
}

export default FileManagerComponent;