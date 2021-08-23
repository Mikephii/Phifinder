import React from "react";
import Typography from "@material-ui/core/Typography";
import support from "../public/images/support.svg";
import diagram from "../public/images/export.svg";
import Image from "next/image";

import WithStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";

const about = ({ classes }) => {
  return (
    <div
      style={{
        margin: "auto",
        marginTop: 85,
        marginBottom: 100,
        width: "80%",
        maxWidth: 500,
      }}
    >
      <div
        style={{
          margin: "auto",
          marginTop: 20,
          marginBottom: 20,
          maxWidth: 250,
        }}
      >
        <Image src={support} alt="support"></Image>
      </div>
      <Typography
        align="center"
        variant="h5"
        color="secondary"
        style={{ fontWeight: 900, marginTop: 20 }}
      >
        Supporting a community means supporting eachother.
      </Typography>

      <Typography variant="h6" className={classes.typography}>
        Phifinder.com lets{" "}
        <span style={{ color: "#ffc107", fontWeight: 900 }}>you get paid </span>
        for sharing valuable analysis with your community
      </Typography>
      <Typography color="textSecondary" className={classes.typography}>
        <span style={{ fontWeight: 900 }}>
          Traditional forums are unsustainable
        </span>{" "}
        with{" "}
        <span style={{ fontWeight: 900 }}>no incentive for users to share</span>{" "}
        sincere and genuine insights. Posts are usually low effort or have an{" "}
        <span style={{ fontWeight: 900 }}>alternative agenda.</span>
      </Typography>
      <Typography
        style={{ marginTop: 20, marginBottom: 20 }}
        variant="h5"
        className={classes.typography}
      >
        When it comes to information online,{" "}
        <span style={{ fontWeight: 900 }}>you get what you pay for.</span>
      </Typography>
      <Typography
        variant="h5"
        color="primary"
        style={{ fontWeight: 900 }}
        className={classes.typography}
      >
        Phifinder Changes Everything.
      </Typography>
      <Typography color="textSecondary" className={classes.typography}>
        Phifinder lets the community{" "}
        <span style={{ fontWeight: 900, color: "white" }}>
          crowd-fund quality information
        </span>{" "}
        from within its members.
      </Typography>
      <Typography color="textSecondary" className={classes.typography}>
        By{" "}
        <span style={{ fontWeight: 900, color: "white" }}>
          paying valuable contributors,
        </span>{" "}
        the community gains{" "}
        <span style={{ fontWeight: 900, color: "white" }}>
          access to quality information{" "}
        </span>
        that would otherwise remain private due to an unwillingness to share.
      </Typography>
      <Typography
        variant="h5"
        style={{ marginTop: 20, fontWeight: 900 }}
        className={classes.typography}
      >
        If you care about democratizing information online...
      </Typography>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          color="primary"
          style={{
            backgroundColor: "#202124",
            fontWeight: 900,
            textTransform: "none",
            fontSize: 30,
            borderRadius: 40,
          }}
        >
          Sign Up
        </Button>
      </div>
      <Typography
        variant="body1"
        align="center"
        style={{ marginTop: 20, fontWeight: 900 }}
        className={classes.typography}
      >
        And spread the word!
      </Typography>

      <div
        style={{
          margin: "auto",
          marginTop: 20,
          marginBottom: 20,
          maxWidth: 500,
          width: "50%",
          paddingLeft: "3vw",
        }}
      >
        <Image src={diagram} alt="diagram"></Image>
      </div>
    </div>
  );
};

const styles = {
  typography: {
    margin: "5px 0px 5px",
  },
};

export default WithStyles(styles)(about);
