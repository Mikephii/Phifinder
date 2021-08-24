import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AttachMoney from "@material-ui/icons/AttachMoney";

import EmailIcon from "@material-ui/icons/Email";

const UnpaidInvoice = ({ date, value }) => {
  const returnWeeks = (date) => {
    let dateObject = new Date(date);
    let weeks = (Date.now() - dateObject.getTime()) / (86400000 * 7);

    let weeksRounded = Math.floor(weeks);

    return `${weeksRounded} weeks ago`;
  };

  return (
    <ListItem>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary={returnWeeks(date)} />
      <ListItemText primary={`$${value.toFixed(2)}`} />
      <ListItemText primary="unpaid" />
      <ListItemIcon>
        <AttachMoney />
      </ListItemIcon>
    </ListItem>
  );
};

export default UnpaidInvoice;
