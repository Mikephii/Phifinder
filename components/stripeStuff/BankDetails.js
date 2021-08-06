import React, { Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const BankDetails = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Typography variant="h6">Your Bank Details</Typography>
      <hr />
      <Typography variant="body2">This is how we pay you</Typography>
      <div className={classes.detailsContainer}>
        <Typography variant="body1">Acc Name:</Typography>
        <Typography variant="body1">BSB:</Typography>
        <Typography variant="body1">Acc number:</Typography>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  detailsContainer: {
    marginTop: 10,
  },
};

export default withStyles(styles, { withTheme: true })(BankDetails);
