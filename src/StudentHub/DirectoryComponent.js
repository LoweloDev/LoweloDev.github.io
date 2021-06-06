import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import {IconButton, ListItemSecondaryAction} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {Link as RouterLink, withRouter} from "react-router-dom";

class DirectoryComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.state;
        console.log(this.props)
    }

    openFolder(jsonObj, entryName) {
        this.setState(jsonObj[entryName] && jsonObj[entryName].child);
    }

    generateListItems(jsonObj) {
        return Object.entries(jsonObj).map(([key, value]) => {
            return (
                <ListItem button onClick={() => this.openFolder(this.state, key)}
                          component={RouterLink} to={ `${this.props.location.pathname}/${value.name}`}>
                    <ListItemIcon>
                        {(value.type === "dir") && <FolderIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={value.name} secondary={(value.type !== "dir") && value.type}/>
                    <ListItemSecondaryAction>
                        <IconButton href={value.download_url}>
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
                {this.generateListItems(this.state)}
            </List>
        );
    }

}

export default withRouter(DirectoryComponent);