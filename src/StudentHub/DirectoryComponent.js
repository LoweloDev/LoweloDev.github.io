import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import {IconButton, ListItemSecondaryAction} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {withRouter} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Grow} from "@material-ui/core";

class DirectoryComponent extends React.Component {
    didMount = false;
    constructor(props) {
        super(props);
        this.state = {
            state: props.state,
            depth: 0
        };
    }

    openFolder(jsonObj, entryName) {
        this.setState({
            state: jsonObj[entryName].child,
            depth: this.state.depth + 1
        });
    }

    generateListItems(jsonObj) {
        const color = "primary";
        return Object.entries(jsonObj).map(([key, value]) => {
            return (
                <ListItem button onClick={() => jsonObj[value.name] && this.openFolder(jsonObj, key)}>
                    <ListItemIcon>
                        {(value.type === "dir") && <FolderIcon color={color}/>}
                    </ListItemIcon>
                    <ListItemText color={color} primary={value.name} secondary={(value.type !== "dir") && value.type}/>
                    <ListItemSecondaryAction>
                        <IconButton color={color} href={value.download_url}>
                            <CloudDownloadIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        })
    }

    render() {
        return (
            <List>
                {this.state.depth > 0 &&
                <ListItem button onClick={() => this.setState({
                    state: this.props.state,
                    depth: this.state.depth - 1
                })}>
                    <ListItemIcon>
                    <ArrowBackIcon color={"primary"}/>
                    </ListItemIcon>
                </ListItem>}
                {this.generateListItems(this.state.state)}
            </List>
        );
    }

}

export default withRouter(DirectoryComponent);