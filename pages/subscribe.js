import React, { useState, useEffect, Fragment } from "react";
import propTypes from "prop-types";
//import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
//resources
import AppLogo from "../images/phi-logo.png";

//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//REDUX STUFF
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const Subscribe = (props) => {
  //DESTRUCTURE
  const {
    classes,
    UI: { loading },
  } = props;
  //STATE

  const [errors, setErrors] = useState({});

  //map global state from props to local state
  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);

  //HANDLERS
  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };

    props.signupUser(newUserData, props.history);
  };

  const handleEmailChange = (event) => {};

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleHandleChange = (event) => {
    setHandle(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Image src={AppLogo} alt="" layout="fill" />
      </div>
      <Typography variant="h2" className={classes.pageTitle}>
        Signup
      </Typography>

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          size="small"
          id="email"
          name="email"
          type="email"
          label="Email"
          className={classes.textField}
          helperText={"helpertext"}
          error={errors.email ? true : false}
          onChange={handleEmailChange}
          fullWidth
        />

        {errors.general && (
          <Typography variant="body2" className={classes.customError}>
            {errors.general}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={loading}
        >
          Signup
          {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </Button>
        <br />
        <small>
          already have an account? <Link href="/login">Login here!</Link>
        </small>
      </form>
    </div>
  );
};

Subscribe.propTypes = {
  classes: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  UI: propTypes.object.isRequired,
  signupUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

const mapActionsToProps = { signupUser };

const styles = (theme) => ({
  ...theme.spreadMe,
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "80%",
    maxWidth: 400,
  },
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(Subscribe));
