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
import SignUp from "./components/pages/Sign Up/SignUp";

// useDispatch hook and useSelector hook
import { useDispatch, useSelector } from "react-redux";

// setUser action
import { setUser } from "./slices/authSlice";

// RootState Type
import { RootState } from "./store";

// Theme
import { theme } from "./theme";

// useEffectHook
import { useEffect } from "react";

const App = () => {
    // Redux Dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            dispatch(setUser(token));
        }
    }, [dispatch]);

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
                    <Route
                        exact
                        path="/sign-up"
                        render={(props) => {
                            if (isAuthenticated) return <Redirect to="/feed" />;
                            return <SignUp {...props} />;
                        }}
                    />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

export default App;
