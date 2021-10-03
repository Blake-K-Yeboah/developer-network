// Global Style
import GlobalStyle from "./components/styles/Global";

// React Router Imports
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";

// Theme Provider
import { ThemeProvider } from "styled-components";

// Pages
import Home from "./components/pages/Home/Home";

// useSelector hook
import { useSelector } from "react-redux";

// RootState Type
import { RootState } from "./store";

// Theme
import { theme } from "./theme";

const App = () => {
    // isAuthenticated
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => {
                            if (isAuthenticated) return <Redirect to="/feed" />;
                            return <Home {...props} />;
                        }}
                    />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
