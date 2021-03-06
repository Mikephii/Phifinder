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

const Login = (props) => {
  //destructure props
  const {
    classes,
    UI: { loading },
  } = props;

  //local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //set global state props into local state
  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);

  //handle submit calls the loginUser redux dispatch
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    props.loginUser(userData, props.history);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.phiContainer}>
        <Image src={AppLogo} alt="" width={100} height={50} />
      </div>

      <Typography variant="h2" className={classes.pageTitle}>
        Login
      </Typography>

      <form noValidate onSubmit={handleSubmit} className={classes.loginForm}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          size="small"
          className={classes.textField}
          value={email}
          helperText={errors.email}
          error={errors.email ? true : false}
          onChange={handleEmailChange}
          fullWidth
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          size="small"
          className={classes.textField}
          value={password}
          helperText={errors.password}
          error={errors.password ? true : false}
          onChange={handlePasswordChange}
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
          Login
          {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </Button>
        <br />
        <div style={{ display: "flex" }}>
          <Typography style={{ whiteSpace: "pre" }} variant="body2">
            dont have an account?{"  "}
          </Typography>
          <Typography variant="body2" color="secondary">
            <Link href="/signup"> Sign up here!</Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  classes: propTypes.object.isRequired,
  loginUser: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  UI: propTypes.object.isRequired,
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
)(withStyles(styles, { withTheme: true })(Login));
