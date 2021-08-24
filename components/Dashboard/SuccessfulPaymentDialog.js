import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

const SuccessfulPaymentDialog = (props) => {
  const { open, setPaymentSuccess } = props;

  const closeDialog = () => {
    setPaymentSuccess(false);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Succesful payment</DialogTitle>
      <DialogContent>
        <Typography>
          Your payout was succesful! You should recieve the funds into your
          payPal account within 3-5 business days
        </Typography>
        <DialogActions>
          <Button variant="outlined" onClick={closeDialog}>
            close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessfulPaymentDialog;
