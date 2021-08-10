import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
//import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/router";
import axios from "axios";
//resources
import AppLogo from "../public/icon.svg";

//Custom components
import PayPal from "../components/payPal/PayPal";

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
            plan_id: "P-5A085181AT0150813MEIHYHI",
          });
        },
        onApprove: function (data, actions) {
          let subscriptionID = data.subscriptionID;
          axios
            .post("/subscribed", { subscriptionID: subscriptionID })
            .then(() => {
              Router.push("/success");
            });
        },
      })
      .render(paypalDiv.current); // Renders the PayPal button
  };

  useEffect(() => {
    paypalScript();
  }, []);

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

//<div ref={paypalDiv}></div>

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
