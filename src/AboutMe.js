import logo from "./logo.svg";
import './construction.css';
import React from 'react';

class AboutMe extends React.Component {
    render() {
        return (
            <div className="App-header">
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
            </div>
        );
    }
}
export default AboutMe;