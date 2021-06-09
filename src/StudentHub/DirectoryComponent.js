import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import {IconButton, InputBase, ListItemSecondaryAction} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {withRouter} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search'
import Fuse from 'fuse.js';

class DirectoryComponent extends React.Component {
    didMount = false;
    localPrimaryColor = "primary";

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
        return Object.entries(jsonObj).map(([key, value]) => {
            return (
                <ListItem button onClick={() => jsonObj[value.name] && this.openFolder(jsonObj, key)}>
                    <ListItemIcon>
                        {(value.type === "dir") && <FolderIcon color={this.localPrimaryColor}/>}
                    </ListItemIcon>
                    <ListItemText color={this.localPrimaryColor} primary={value.name} secondary={(value.type !== "dir") && value.type}/>
                    <ListItemSecondaryAction>
                        <IconButton color={this.localPrimaryColor} href={value.download_url}>
                            <CloudDownloadIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        })
    }

    fuseSearch(list, search) {
        const options = {
            includeScore: true,
            keys: ['name', 'type', 'html_url', 'child.name', 'child.type', 'child.html_url']
        }

        const fuse = new Fuse(list, options)

        if (search === "") return this.props.state;

        return fuse.search(search).map(item => {
            return {
                name: item.item.name,
                download_url: item.item.download_url,
                html_url: item.item.html_url,
                type: item.item.type,
                child: item.item.child
            }
        }).reduce((acc, currItem) => (acc[currItem.name] = currItem, acc), {});
    }

    render() {
        if(this.state.state !== null) {
            // this.fuseSearch(Object.values(this.state.state), "1. Semester");
        }
        return (
            <List>
                <ListItem>
                    <ListItemIcon>
                        <SearchIcon color={this.localPrimaryColor}/>
                    </ListItemIcon>
                    <InputBase
                        color={this.localPrimaryColor}
                        placeholder="Search…"
                        onChange={(search) => {
                            // this.fuseSearch(Object.values(this.state.state), search.target.value)
                            this.setState({
                                state: this.fuseSearch(Object.values(this.props.state), search.target.value)
                            })
                        }}
                    />
                </ListItem>
                {this.state.depth > 0 &&
                <ListItem button onClick={() => this.setState({
                    state: this.props.state,
                    depth: this.state.depth - 1
                })}>
                    <ListItemIcon>
                    <ArrowBackIcon color={this.localPrimaryColor}/>
                    </ListItemIcon>
                </ListItem>}
                {this.generateListItems(this.state.state)}
            </List>
        );
    }

}

export default withRouter(DirectoryComponent);