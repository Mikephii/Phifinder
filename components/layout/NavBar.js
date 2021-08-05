import React, { Fragment } from "react";
//import { Link } from "react-router-dom/";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

//Components
import MyButton from "../../utility/MyButton";
import NewPost from "../post/NewPost";
import Notifications from "./Notifications";
import FeedController from "./FeedController";
import NavMenu from "./NavMenu";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HideOnScroll from "./HideOnScroll";
import { Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
//icons
import Phifinder from "../../public/images/logo2.svg";
import AddIcon from "@material-ui/icons/Add";

import NotificationsIcon from "@material-ui/icons/Notifications";

//redux stuff
import { connect } from "react-redux";

const NavBar = (props) => {
  const { authenticated } = props;

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
                  <Image src={Phifinder} alt="Phifinder" />
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
                <Image src={Phifinder} alt="Phifinder" />
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
