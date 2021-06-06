import React from 'react';
import {Route, Switch} from "react-router-dom";
import AboutMe from "../AboutMe";
import FileManagerComponent from "../StudentHub/FileManagerComponent";

export default class Routing extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/about">
                    <AboutMe/>
                </Route>
                <Route path="/studenthub">
                    <FileManagerComponent/>
                </Route>
            </Switch>
        );
    }
}
