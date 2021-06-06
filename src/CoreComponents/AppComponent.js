import React from "react";
import NavBar from "./NavBarComponent";
import {darkTheme} from "./Themes";
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing";

function AppComponent() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <NavBar/>
                <Routing />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default AppComponent;