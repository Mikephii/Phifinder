import React, { Fragment } from "react";
//import { Link } from "react-router-dom/";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

//Components

import Notifications from "./Notifications";

import NavMenu from "./NavMenu";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

//icons
//import Phifinder from "../../public/images/logo2.svg";

//redux stuff
import { connect } from "react-redux";

const NavBar = (props) => {
  const { authenticated } = props;

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className="nav-container"
        style={{
          backgroundColor: "#202124",
          boxShadow: "0px -2px 5px black",
        }}
      >
        <Toolbar className="nav-container">
          {authenticated ? (
            <div
              style={{
                margin: "auto",
                width: "100%",
                maxWidth: "800px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <NavMenu />
              <Link href="/home" passHref>
                <Link href="/home" passHref>
                  <Image
                    src="/images/logo2.svg"
                    height="50"
                    width="100"
                    alt="Phifinder"
                  />
                </Link>
              </Link>
              <Notifications />
            </div>
          ) : (
            <div
              style={{
                margin: "auto",
                width: "100%",
                maxWidth: "800px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link href="/login" passHref>
                <Button color="primary">Login</Button>
              </Link>

              <Link href="/home" passHref>
                <Image
                  src="/images/logo2.svg"
                  height="50"
                  width="100"
                  alt="Phifinder"
                />
              </Link>

              <Link href="/signup" passHref>
                <Button color="secondary">Signup</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

export default connect(mapStateToProps)(NavBar);
