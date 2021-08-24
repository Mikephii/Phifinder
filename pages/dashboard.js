import React, { useState, useEffect } from "react";
import axios from "axios";

import withStyles from "@material-ui/styles/withStyles";

import Invoices from "../components/Dashboard/Invoices";
import Earnings from "../components/Dashboard/Earnings";

const Dashboard = (props) => {
  const { classes } = props;

  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  useEffect(() => {
    if (loadingInvoices) {
      axios.defaults.headers.common["Authorization"] = localStorage.FBIdToken;

      axios
        .get("/getInvoices")
        .then((invoices) => {
          console.log(invoices.data);
          setInvoices(invoices.data);
          setLoadingInvoices(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingInvoices(false);
        });
    }
  }, [loadingInvoices]);

  return (
    <div style={{ marginTop: 100 }}>
      <Earnings invoices={invoices} setLoadingInvoices={setLoadingInvoices} />
      <div className={classes.containerDiv}>
        <Invoices invoices={invoices} loadingInvoices={loadingInvoices} />
      </div>
    </div>
  );
};

const styles = {
  card: { marginTop: 55, background: "#202124", height: 5000 },
  cardContent: { marginTop: 22 },
  containerDiv: {
    margin: "auto",
    marginTop: 20,
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#202124",
  },
};

export default withStyles(styles, { withTheme: true })(Dashboard);
