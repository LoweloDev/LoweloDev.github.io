import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import FolderComponent from "./GitHubAPI/FolderComponent";
import AboutMe from "./AboutMe";
import TestComponent from "./TestComponent";

//TODO proper routing and navigation (via history e.g.)
// TODO cleaning up codebase and implementing the rest of basic UI
function App() {
    return (
        <div className="App">
            <Router>
                <div className="testClass">
                <Link to="/about">About Me</Link>
                <Link to="/studenthub">StudentHub</Link>
                <Link to="/TestComponent">TescComponent</Link>
                </div>
                <Switch>
                    <Route path="/about">
                        <AboutMe />
                    </Route>
                    <Route path="/studenthub">
                        <FolderComponent/>
                    </Route>
                    <Route path="/TestComponent">
                        <TestComponent />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
