import React from "react";
import CoinSvg from "./CoinSvg";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

function CoinCount(props) {
  const { classes, coinCount, postId } = props;

  return coinCount > 0 ? (
    <div className={classes.container}>
      <CoinSvg size={8} />
      <div className={classes.text}>
        <Typography variant="h6" color="primary">
          × {coinCount}
        </Typography>
      </div>
    </div>
  ) : null;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
};

export default withStyles(styles)(CoinCount);
