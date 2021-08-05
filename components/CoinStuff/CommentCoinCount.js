import React from "react";
import SmallCoinSvg from "./SmallCoinSvg";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

function CommentCoinCount(props) {
  const { classes, coinCount, postId } = props;

  return coinCount > 0 ? (
    <div className={classes.container}>
      <SmallCoinSvg size={4} />
      <div className={classes.text}>
        <Typography variant="body2" color="primary">
          x{coinCount}
        </Typography>
      </div>
    </div>
  ) : null;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
};

export default withStyles(styles)(CommentCoinCount);
