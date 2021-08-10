import React, { Fragment, useEffect } from "react";
//import { Link } from "react-router-dom/";
import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
//Components

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
//icons
import AddIcon from "@material-ui/icons/Add";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";

//redux stuff
import { connect } from "react-redux";

const FeedController = (props) => {
  const { authenticated, classes, joinedGroups } = props;
  const Router = useRouter();
  const [group, setGroup] = React.useState(props.group ? props.group : "");
  const [homeSelected, setHomeSelected] = React.useState(
    Router.asPath === "/home" || Router.asPath === "/" ? true : false
  );
  const [popularSelected, setPopularSelected] = React.useState(
    Router.asPath === "/popular" ? true : false
  );

  useEffect(() => {
    setGroup(props.group);
  }, [props.group]);

  const handleChange = (event) => {
    setGroup(event.target.value);
    Router.push(`/p/${event.target.value}`);
  };

  //if no groups becaause not logged in just give these options for groups
  const groupOptions = joinedGroups ? joinedGroups : ["ASX"];
  const joinedGroupsMarkup = groupOptions.map((group) => {
    return (
      <option key={group} value={group}>
        {group}
      </option>
    );
  });

  return (
    <Fragment>
      <HideOnScroll direction="down">
        <AppBar
          position="fixed"
          className="nav-container"
          style={{
            top: 55,

            backgroundColor: "#202124",
            borderBottom: "solid 1px #9aa0a6",
            boxShadow: "none",
          }}
        >
          <Toolbar className="nav-container">
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
                className={
                  homeSelected ? classes.selectedText : classes.unselected
                }
                style={{ marginRight: "auto" }}
              >
                <Link href="/home" passHref>
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: 16,
                      fontStrength: 600,
                      color: "white",
                    }}
                  >
                    Home
                  </Typography>
                </Link>
              </div>
              <div
                className={
                  popularSelected ? classes.selectedText : classes.unselected
                }
              >
                <Link href="/popular" passHref>
                  <Typography
                    variant="h3"
                    style={{
                      fontSize: 16,
                      fontStrength: 600,
                      color: "white",
                    }}
                  >
                    Popular
                  </Typography>
                </Link>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <FormControl>
                  <Select
                    className={
                      group !== "" ? classes.selected : classes.unselected
                    }
                    value={group}
                    onChange={handleChange}
                    displayEmpty
                    native
                    inputProps={{ "aria-label": "Without label" }}
                    color="primary"
                  >
                    <option value="" disabled>
                      Groups
                    </option>
                    {joinedGroupsMarkup}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  );
};

FeedController.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    joinedGroups: state.user.credentials.groups,
  };
};

const styles = {
  selected: {
    color: "white",

    borderBottom: "solid 3px #FFC107",
    "&:before": {
      borderBottom: "none",
    },
  },
  unselected: {
    color: "rgba(255,255,255,0.7)",
    "&:before": {
      borderBottom: "none",
    },
  },
  selectedText: {
    color: "white",
    padding: "8px 0px 8px",
    borderBottom: "solid 3px #FFC107",
    "&:before": {
      borderBottom: "none",
    },
  },
};

export default connect(mapStateToProps)(WithStyles(styles)(FeedController));
