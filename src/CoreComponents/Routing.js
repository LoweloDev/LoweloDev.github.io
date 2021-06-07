import React from 'react';
import {Route, Switch} from "react-router-dom";
import AboutMe from "../AboutMe";
import FileManagerComponent from "../StudentHub/FileManagerComponent";
import SwipeableRoutes from "react-swipeable-routes";

export default class Routing extends React.Component {
    render() {
        return (
            <SwipeableRoutes>
                <Route path="/about">
                    <AboutMe/>
                </Route>
                <Route path="/studenthub">
                    <FileManagerComponent/>
                </Route>
            </SwipeableRoutes>
        );
    }
}
