import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Upload from './containers/Upload';
import Stats from './containers/Stats';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <Router>
            <Switch>
                <Route path="/upload">
                    <Upload/>
                </Route>
                <Route path="/">
                    <Stats/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
