import {createMuiTheme} from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({

    palette: {

        primary: {

            main: "#272c34",

            contrastText: "#eceff1",

        },

        secondary: {

            main: "#eceff1",

            contrastText: "#272c34",

        },
    },

    overrides: {
        MuiTabs: {
            indicator: {
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                height: "5%",
            },
        },
        MuiTab: {
            root: {
                color: "#eceff1",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    background: "-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                }
            }
        }

    }

});