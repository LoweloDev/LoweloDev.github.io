import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import FolderComponent from "./FolderComponent";
import AboutMe from "./AboutMe";

function App() {
    return (
        <div className="App">
            <Router>
                <div className="testClass">
                <Link to="/about">About Me</Link>
                <Link to="/studenthub">StudentHub</Link>
                </div>
                <Switch>
                    <Route path="/about">
                        <AboutMe />
                    </Route>
                    <Route path="/studenthub">
                        <FolderComponent/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
