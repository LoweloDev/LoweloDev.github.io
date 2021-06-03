import React from 'react';
import RepoAPI from "./RepoAPI";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import {IconButton, ListItemSecondaryAction} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

class FolderComponent extends React.Component {
    componentWillMount() {
        const githubrepos = new RepoAPI("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", "LoweloDev");

        githubrepos.getFoldersWithChild("University", "")
            .then(item => {
                this.setState(item.reduce((acc,currItem)=> (acc[currItem.name]= currItem, acc),{}))
                console.log(this.state["1. Semester"])
            })
    }

    render() {
        if (this.state !== null) {
            return (
                <List>
                    {Object.entries(this.state).map(([key, value]) => {
                        return (
                            <ListItem button onClick={ () => this.setState(this.state[value.name].child)}>
                                <ListItemIcon>
                                    {(value.type === "dir") && <FolderIcon/>}
                                </ListItemIcon>
                                <ListItemText>{value.name}</ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton href={value.download_url}>
                                        <CloudDownloadIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

}

export default FolderComponent;