import React, { Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const Earnings = (props) => {
  const { classes } = props;
  return (
    <Card boxShadow={10} className={classes.earningsContainer}>
      <CardContent className={classes.earningsColumn}>
        <div className={classes.yourEarnings}>
          <Typography variant="h5" color="white" style={{ fontWeight: 900 }}>
            Your Earnings
          </Typography>
        </div>

        <Typography variant="h3" color="primary" style={{ fontWeight: 900 }}>
          $3.50
        </Typography>
        <div className={classes.cashoutButtonDiv}>
          <Button
            className={classes.paymeButton}
            variant="outlined"
            color="secondary"
          >
            pay me
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const styles = {
  earningsContainer: {
    backgroundColor: "#303134",

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
    boxShadow: "3px 3px 5px rgba(0,0,0,0.1), 1px 3px 2px rgba(0,0,0,0.1)",
  },
  cashoutButtonDiv: {
    marginTop: 23,
  },
};

export default withStyles(styles, { withTheme: true })(Earnings);
