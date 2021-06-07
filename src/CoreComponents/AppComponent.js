import React from "react";
import NavBar from "./NavBarComponent";
import {darkTheme} from "./Themes";
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing";
import {Container} from "@material-ui/core";

function AppComponent() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <NavBar/>
                <Container maxWidth="xl">
                <Routing />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default AppComponent;