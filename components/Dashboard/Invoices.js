import React, { useState, useEffect } from "react";
import axios from "axios";

//mui

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AttachMoney from "@material-ui/icons/AttachMoney";
import DraftsIcon from "@material-ui/icons/Drafts";
import EmailIcon from "@material-ui/icons/Email";
import ListSubheader from "@material-ui/core/ListSubheader";
import LinearProgress from "@material-ui/core/LinearProgress";

//custom Comps
import UnpaidInvoice from "./UnpaidInvoice";
import PaidInvoice from "./PaidInvoice.js";
import PendingInvoice from "./PendingInvoice";

import withStyles from "@material-ui/core/styles/withStyles";

const Invoices = (props) => {
  const { classes, invoices, loadingInvoices } = props;

  const invoiceListItems = invoices.map((invoice, index) => {
    switch (invoice.paid) {
      case true:
        return (
          <PaidInvoice key={index} date={invoice.date} value={invoice.value} />
        );
      case false:
        return (
          <UnpaidInvoice
            key={index}
            date={invoice.date}
            value={invoice.value}
          />
        );
    }
  });

  const progressSpinner = (
    <div style={{ width: "80%", margin: "auto" }}>
      <LinearProgress color="secondary" />
    </div>
  );

  return (
    <div className={classes.containerDiv}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Earnings History
          </ListSubheader>
        }
      >
        <Divider />
        <PendingInvoice />
        {loadingInvoices ? (
          progressSpinner
        ) : invoices[0] ? (
          invoiceListItems
        ) : (
          <ListItem>
            <ListItemText
              style={{ color: "grey" }}
              primary="Your Weekly Earnings History Will Appear Here"
            />
          </ListItem>
        )}
        <Divider />

        <ListItem>
          <ListItemText primary="" />
        </ListItem>
      </List>
    </div>
  );
};

const styles = {
  spinnerDiv: {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    border: "solid red 1px",
  },
};

export default withStyles(styles)(Invoices);
