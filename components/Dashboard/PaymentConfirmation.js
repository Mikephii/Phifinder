import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { getUserData } from "../../redux/actions/userActions";
import axios from "axios";

const PaymentConfirmation = (props) => {
  const {
    open,
    toggleDialog,
    statePaymentEmail,
    value,
    loadingPayment,
    createPayment,
    paymentError,
  } = props;
  const [emailForm, setEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [paymentEmail, setPaymentEmail] = useState(statePaymentEmail);
  const [error, setError] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);

  useEffect(() => {
    setPaymentEmail(statePaymentEmail);
  }, [statePaymentEmail]);

  const toggleEmailForm = () => {
    setEmailForm(!emailForm);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const updateEmail = () => {
    setLoadingEmail(true);
    axios
      .post("/updatePaymentEmail", { newEmail: email })
      .then((res) => {
        getUserData();
        if (res.status === 200) {
          setPaymentEmail(email);
          setError("");
          toggleEmailForm();
        }
        setLoadingEmail(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoadingEmail(false);
      });
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      {loadingPayment ? (
        <div style={{ margin: "auto", padding: 50 }}>
          <CircularProgress size={150} />
        </div>
      ) : (
        <div>
          <DialogContent>
            <DialogContentText>
              {`We are going to transfer $${value} to the payPal account connected to:`}
              <Typography variant="body1" color="primary">
                {paymentEmail}
              </Typography>
            </DialogContentText>

            {!emailForm ? (
              <Typography
                style={{ textDecoration: "underline" }}
                color="secondary"
                variant="caption"
                onClick={toggleEmailForm}
              >
                Click here to update your email!
              </Typography>
            ) : loadingEmail ? (
              <CircularProgress />
            ) : (
              <div>
                <TextField
                  error={error ? true : false}
                  helperText={error}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                />
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleEmailForm}
                  >
                    cancel
                  </Button>
                  <Button
                    onClick={updateEmail}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    update email
                  </Button>
                </div>
              </div>
            )}
            <Typography color="error">{paymentError}</Typography>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={toggleDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={createPayment}>
              Confirm payment
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    statePaymentEmail: state.user.credentials.paymentEmail,
  };
};

export default connect(mapStateToProps)(PaymentConfirmation);
