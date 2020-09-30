import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={home} />
          <Route path="/signup" component={signup} />
          <Route path="/login" component={login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
