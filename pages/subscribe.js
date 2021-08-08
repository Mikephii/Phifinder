import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
//import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/router";
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
import axios from "axios";

const Subscribe = (props) => {
  const Router = useRouter();
  //DESTRUCTURE
  const {
    classes,
    UI: { loading },
  } = props;
  //STATE

  //old errors state
  const [errors, setErrors] = useState({});

  //map global state from props to local state
  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);

  const paypalScript = () => {
    console.log("paypalScript");
    //namespace provided by script tag in head of _document.js
    window.paypal
      .Buttons({
        style: {
          shape: "pill",
          color: "gold",
          layout: "vertical",
          label: "paypal",
        },
        createSubscription: function (data, actions) {
          return actions.subscription.create({
            /* Creates the subscription */
            plan_id: "P-315093088M773420EMEHXQCA",
          });
        },
        onApprove: function (data, actions) {
          alert(data.subscriptionID); // You can add optional success message for the subscriber here
        },
      })
      .render(paypalDiv.current); // Renders the PayPal button
  };

  useEffect(() => {
    paypalScript();
  });

  const paypalDiv = useRef();

  return (
    <div className={classes.container}>
      <div className={classes.phiContainer}>
        <Image src={AppLogo} alt="" width={100} height={50} />
      </div>
      <Typography variant="h2" className={classes.pageTitle}>
        Subscribe
      </Typography>

      <div ref={paypalDiv}></div>
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
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    width: "80%",
    maxWidth: 400,
  },
  phiContainer: { margin: "auto" },
});

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(Subscribe));
