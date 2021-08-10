import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
//import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
//resources
import AppLogo from "../public/icon.svg";

//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//REDUX STUFF
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const Success = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <div className={classes.phiContainer}>
        <Image src={AppLogo} alt="" width={100} height={50} />
      </div>

      <Typography variant="h2" className={classes.pageTitle}>
        Success!
      </Typography>
      <Typography variant="h6">
        The best way to support a community is to support eachother
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          click here to continue
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

const styles = (theme) => ({
  ...theme.spreadMe,
  container: {
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    width: "80%",
    maxWidth: 400,
  },
  phiContainer: { margin: "auto" },
  loginForm: {
    width: "100%",
    display: "flex",
    flexDirection: "Column",
    alignItems: "center",
  },
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(Success));
