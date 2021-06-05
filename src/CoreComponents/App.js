import React from "react";
import NavBar from "./NavBar";
import {darkTheme} from "./Themes";
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AboutMe from "../AboutMe";
import FileManagerComponent from "../StudentHub/FileManagerComponent";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <NavBar/>
                <Switch>
                    <Route path="/about">
                        <AboutMe/>
                    </Route>
                    <Route path="/studenthub">
                        <FileManagerComponent/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;