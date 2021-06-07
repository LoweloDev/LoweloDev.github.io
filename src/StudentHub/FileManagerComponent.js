import React from "react";
import DirectoryComponent from "./DirectoryComponent";
import Repository from "./Repository";

class FileManagerComponent extends React.Component {

    constructor(props) {
        super(props);
        const git = new Repository("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", "LoweloDev");

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
            return <div>Loading ... / Github API Limit reached</div>
        }
    }
}

export default FileManagerComponent;