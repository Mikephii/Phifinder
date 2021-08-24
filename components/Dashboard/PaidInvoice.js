import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DraftsIcon from "@material-ui/icons/Drafts";

import DoneIcon from "@material-ui/icons/Done";

const PaidInvoice = ({ date, value }) => {
  const returnWeeks = (date) => {
    let dateObject = new Date(date);
    let weeks = (Date.now() - dateObject.getTime()) / (86400000 * 7);

    let weeksRounded = Math.floor(weeks);

    return `${weeksRounded} weeks ago`;
  };

  return (
    <ListItem style={{ color: "grey" }}>
      <ListItemIcon>
        <DraftsIcon style={{ color: "grey" }} />
      </ListItemIcon>
      <ListItemText primary={returnWeeks(date)} />
      <ListItemText primary={`$${value.toFixed(2)}`} />
      <ListItemText primary="paid" />
      <ListItemIcon>
        <DoneIcon style={{ color: "grey" }} />
      </ListItemIcon>
    </ListItem>
  );
};

export default PaidInvoice;
