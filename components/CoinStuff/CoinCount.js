import React from "react";
import CoinSvg from "./CoinSvg";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Coins from "../../public/images/coins.svg";
import Image from "next/image";
function CoinCount(props) {
  const { classes, coinCount, postId } = props;

  return coinCount > 0 ? (
    <div className={classes.container}>
      <div style={{ width: 30, height: 30 }}>
        <Image src={Coins} alt="coins" />
      </div>
      <div className={classes.text}>
        <Typography variant="h6" color="primary" style={{ fontWeight: 900 }}>
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
    marginLeft: 5,
    minWidth: 50,
    width: "auto",
    height: "auto",
  },
};

export default withStyles(styles)(CoinCount);
