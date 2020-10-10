import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Components
import Navbar from "./components/Navbar";
import AuthRoute from "./utils/AuthRoute";
//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import signup from "./pages/Signup";

//theme

import rootTheme from "./utils/theme";

const theme = createMuiTheme(rootTheme);

let authenticated;
const token = localStorage.authToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = "/login";
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// }

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <AuthRoute
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
                <AuthRoute
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
