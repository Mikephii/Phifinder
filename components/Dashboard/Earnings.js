import React, { Fragment, useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

//custom
import PaymentConfirmation from "./PaymentConfirmation";
import SuccessfulPaymentDialog from "./SuccessfulPaymentDialog";

import axios from "axios";

const Earnings = (props) => {
  const { classes, invoices, setLoadingInvoices } = props;
  const [loading, setLoading] = useState(false);
  const [earnings, setEarnings] = useState("");
  const [exceeds5, setExceeds5] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    setEarnings(calculateEarnings(invoices));
  }, [invoices]);

  const calculateEarnings = (invoices) => {
    let earnings = 0;
    invoices.forEach((invoice) => {
      if (!invoice.paid) {
        earnings = earnings + invoice.value;
      }
    });
    if (earnings > 5.0) {
      setExceeds5(true);
    }
    return earnings.toFixed(2);
  };

  const createPayment = () => {
    setLoading(true);

    let unpaidInvoices = invoices.filter((invoice) => {
      return invoice.paid === false;
    });
    if (unpaidInvoices.length === 0) {
      setPaymentError("no unpaid invoices");
      setLoading(false);
    } else {
      axios.defaults.headers.common["Authorization"] = localStorage.FBIdToken;
      axios
        .post("/createPayment")
        .then(() => {
          setLoading(false);
          setLoadingInvoices(true);
          toggleDialog();
          setPaymentSuccess(true);
          setPaymentError("");
        })
        .catch((err) => {
          setLoading(false);
          setLoadingInvoices(true);
          setPaymentError(err.response.data.error);
          console.error(err);
        });
    }
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <Card boxShadow={10} className={classes.earningsContainer}>
      <CardContent className={classes.earningsColumn}>
        <div className={classes.yourEarnings}>
          <Typography variant="h5" color="white" style={{ fontWeight: 900 }}>
            Your Earnings
          </Typography>
        </div>

        <Typography variant="h3" color="primary" style={{ fontWeight: 900 }}>
          {`$${earnings}`}
        </Typography>
        {exceeds5 ? (
          <div className={classes.cashoutButtonDiv}>
            <Button
              className={classes.paymeButton}
              variant="outlined"
              color="secondary"
              onClick={toggleDialog}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={"80%"} color="secondary" />
              ) : null}
              {!loading ? "pay me" : null}
            </Button>
          </div>
        ) : (
          <div className={classes.cashoutButtonDiv}>
            <Typography variant="caption" align="center">
              Once your balance exceeds $5 you can cash out funds
            </Typography>
            <Tooltip
              leaveTouchDelay={10000}
              enterTouchDelay={0}
              arrow
              title="This is a temporary measure to minmize payment fees charged by payPal. Without this measure Phifinder would not be possible "
            >
              <Typography
                className={classes.whyLink}
                variant="caption"
                color="secondary"
                align="center"
              >
                Why?
              </Typography>
            </Tooltip>
          </div>
        )}
      </CardContent>
      <PaymentConfirmation
        value={earnings}
        open={dialogOpen}
        toggleDialog={toggleDialog}
        paymentEmail={props.paymentEmail}
        createPayment={createPayment}
        loadingPayment={loading}
        paymentError={paymentError}
      />
      <SuccessfulPaymentDialog
        setPaymentSuccess={setPaymentSuccess}
        open={paymentSuccess}
      />
    </Card>
  );
};

const styles = {
  earningsContainer: {
    backgroundColor: "#202124",

    borderRadius: 8,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    width: 280,
    padding: 30,
  },
  earningsColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  yourEarnings: { marginBottom: 20 },
  paymeButton: {
    borderRadius: 30,
    fontWeight: 900,
  },
  cashoutButtonDiv: {
    marginTop: 23,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  whyLink: {
    textDecoration: "underline",
  },
};

export default withStyles(styles, { withTheme: true })(Earnings);
