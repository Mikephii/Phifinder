import React, { useState, useEffect } from "react";
import axios from "axios";

//mui
import WithStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AttachMoney from "@material-ui/icons/AttachMoney";
import DraftsIcon from "@material-ui/icons/Drafts";
import EmailIcon from "@material-ui/icons/Email";
import ListSubheader from "@material-ui/core/ListSubheader";
import Timelapse from "@material-ui/icons/Timelapse";
import TrendingUp from "@material-ui/icons/TrendingUp";
import DoneIcon from "@material-ui/icons/Done";

const PaidInvoice = ({ date, value }) => {
  const [pendingInvoiceValue, setPendingInvoiceValue] = useState(0);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = localStorage.FBIdToken;
    axios
      .get("/pendingInvoice")
      .then((res) => {
        console.log(res.data.pendingInvoiceValue);
        setPendingInvoiceValue(res.data.pendingInvoiceValue);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const ConditionalMarkup =
    pendingInvoiceValue < 0.001 ? null : (
      <ListItem style={{ color: "lightgrey" }}>
        <ListItemIcon>
          <Timelapse />
        </ListItemIcon>
        <ListItemText primary={"This week"} />
        <ListItemText primary={`$${pendingInvoiceValue}`} />
        <ListItemText primary="pending" />
        <ListItemIcon>
          <TrendingUp />
        </ListItemIcon>
      </ListItem>
    );

  return <div>{ConditionalMarkup}</div>;
};

export default PaidInvoice;
