import logo from "./logo.svg";
import React from 'react';

class AboutMe extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Nothing here yet. Under construction.
                </p>
                <a
                    className="App-link"
                    href="https://github.com/LoweloDev/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link to my GitHub
                </a>
            </header>
        );
    }
}
export default AboutMe;