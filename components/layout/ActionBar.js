import React, { Fragment, useEffect } from "react";
//import { Link } from "react-router-dom/";
import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
//Components
import MyButton from "../../utility/MyButton";
import NewPost from "../post/NewPost";
import Notifications from "./Notifications";
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
import WithStyles from "@material-ui/styles/withStyles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
//icons
import AddIcon from "@material-ui/icons/Add";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import HelpOutline from "@material-ui/icons/HelpOutline";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";

//redux stuff
import { connect } from "react-redux";
import BottomNavigationButton from "./BottomNavigationButton";

const ActionBar = (props) => {
  const { authenticated, classes } = props;
  const Router = useRouter();
  const [group, setGroup] = React.useState(props.group ? props.group : "");
  const [homeSelected, setHomeSelected] = React.useState(
    Router.asPath === "/home" ? true : false
  );
  const [popularSelected, setPopularSelected] = React.useState(
    Router.asPath === "/popular" ? true : false
  );

  const [hide, setHide] = React.useState(false);
  useEffect(() => {
    const hidePages = ["/login", "/signup", "/subscribe", "/about"];

    if (hidePages.includes(Router.asPath)) {
      console.log("hide");
      setHide(true);
    } else {
      setHide(false);
    }
  }, [Router]);

  const [value, setValue] = React.useState(1);

  useEffect(() => {
    setGroup(props.group);
  }, [props.group]);

  const handleChange = (event) => {
    setGroup(event.target.value);
    Router.push(`/p/${event.target.value}`);
  };

  const newPost = () => {
    Router.push("/author");
  };

  if (hide) {
    return null;
  }

  return (
    <Fragment>
      <HideOnScroll direction="up">
        <BottomNavigation
          style={{
            width: "100%",

            position: "fixed",
            bottom: -1,
            backgroundColor: "#202124",
            borderTop: "solid 0.5px #9aa0a6",
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <div
            style={{
              margin: "auto",
              width: "80%",
              maxWidth: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <BottomNavigationButton
                label="About"
                icon={<HelpOutline />}
                href="/about"
              />
              <BottomNavigationButton
                label="New Post"
                icon={<AddIcon />}
                href="/author"
              />
              <BottomNavigationButton
                label="Earnings"
                icon={<TrendingUpIcon />}
                href="/dashboard"
              />
            </div>
          </div>
        </BottomNavigation>
      </HideOnScroll>
    </Fragment>
  );
};

ActionBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

const styles = {
  root: {
    color: "rgba(255,255,255,0.9)",
    "&$selected": {},
  },
  selected: {},
};

export default connect(mapStateToProps)(WithStyles(styles)(ActionBar));
