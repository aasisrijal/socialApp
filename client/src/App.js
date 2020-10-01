import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//Components
import Navbar from "./components/Navbar";

//Pages
import Home from "./pages/Home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#cb99df",
      main: "#8936b5",
      dark: "#632ca4",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e691c3",
      main: "#cb227d",
      dark: "#b42175",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={signup} />
              <Route path="/login" component={login} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
