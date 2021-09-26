import { Link as RouterLink, withRouter} from "react-router-dom";
import {AppBar, Tabs} from "@material-ui/core";
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const styles = ({
    navbar: {
        padding: "1vw 1vw",
    }
})

class NavBarComponent extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <AppBar className={classes.navbar} position="fixed">
                <Tabs value={this.props.location.pathname} >
                    <Tab label="About Me" component={RouterLink} to="/about" value="/about"/>
                    <Tab label="Student Hub" component={RouterLink} to="/studenthub" value="/studenthub"/>
                </Tabs>
            </AppBar>
        );
    }
}

export default withRouter((withStyles(styles)(NavBarComponent)));
