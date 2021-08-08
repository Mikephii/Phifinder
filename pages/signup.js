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
import { signupUser } from "../redux/actions/userActions";

const Signup = (props) => {
  //DESTRUCTURE
  const {
    classes,
    UI: { loading },
  } = props;
  //STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

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
      <div className={classes.phiContainer}>
        <Image src={AppLogo} alt="" width={100} height={50} />
      </div>
      <Typography variant="h2" className={classes.pageTitle}>
        Signup
      </Typography>

      <form noValidate onSubmit={handleSubmit} className={classes.signupForm}>
        <TextField
          variant="outlined"
          size="small"
          id="email"
          name="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={email}
          helperText={errors.email}
          error={errors.email ? true : false}
          onChange={handleEmailChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          size="small"
          id="password"
          name="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={password}
          helperText={errors.password}
          error={errors.password ? true : false}
          onChange={handlePasswordChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          size="small"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          className={classes.textField}
          value={confirmPassword}
          helperText={errors.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleConfirmPasswordChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          size="small"
          id="handle"
          name="handle"
          type="text"
          label="Handle"
          className={classes.textField}
          value={handle}
          helperText={errors.handle}
          error={errors.handle ? true : false}
          onChange={handleHandleChange}
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
        <div style={{ display: "flex" }}>
          <Typography style={{ whiteSpace: "pre" }} variant="body2">
            Already have an account?{"  "}
          </Typography>
          <Typography variant="body2" color="secondary">
            <Link href="/subscribe"> Login here!</Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

Signup.propTypes = {
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
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    width: "80%",
    maxWidth: 400,
  },
  phiContainer: { margin: "auto" },
  signupForm: {
    width: "100%",
    display: "flex",
    flexDirection: "Column",
    alignItems: "center",
  },
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
