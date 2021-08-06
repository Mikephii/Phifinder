import React, { Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Earnings from "../components/stripeStuff/Earnings";
import BankDetails from "../components/stripeStuff/BankDetails";
import CardDetails from "../components/stripeStuff/CardDetails";
const Dashboard = (props) => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Earnings />
        <BankDetails />
        <CardDetails />
      </CardContent>
    </Card>
  );
};

const styles = {
  card: { marginTop: 55, background: "#202124", height: 5000 },
  cardContent: { marginTop: 22 },
};

export default withStyles(styles, { withTheme: true })(Dashboard);
