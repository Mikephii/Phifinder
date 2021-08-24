import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Script from "next/script";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../utility/theme";
import Navbar from "../components/layout/NavBar";
import ActionBar from "../components/layout/ActionBar";
import axios from "axios";
import "../styles/globals.css";
//REDUX
import { Provider } from "react-redux";
import store from "../redux/store";
import { SET_AUTHENTICATED } from "../redux/types";
import { logoutUser, getUserData } from "../redux/actions/userActions";
import jwtDecode from "jwt-decode";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  //https://615048577588.ngrok.io/australia-southeast1/api/webhook
  //http://localhost:5000/socialape-67dbc/australia-southeast1/
  //https://australia-southeast1-socialape-67dbc.cloudfunctions.net

  axios.defaults.baseURL =
    "http://localhost:5000/socialape-67dbc/australia-southeast1/api";

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const idToken = localStorage.FBIdToken;

      if (idToken) {
        const decodedToken = jwtDecode(idToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          store.dispatch(logoutUser());
          window.location.href = "/login";
        } else {
          store.dispatch({ type: SET_AUTHENTICATED });
          axios.defaults.headers.common["Authorization"] = idToken;
          store.dispatch(getUserData());
        }
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Phifinder</title>
        <link rel="icon" href="/icon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="container">
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            <Component {...pageProps} />
          </div>
          <Navbar />
          <ActionBar />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
