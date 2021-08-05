import React from "react";

//Icons
import UpvoteComment from "./UpvoteComment";
import DownvoteComment from "./DownvoteComment";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";

const VotingControl = (props) => {
  const { classes, comment, likeCount, dislikeCount } = props;

  return (
    <div className={classes.votingBox}>
      <UpvoteComment comment={comment} />
      <div>{likeCount - dislikeCount}</div>

      <DownvoteComment comment={comment} />
    </div>
  );
};

const styles = {
  votingBox: { display: "flex", flexDirection: "row", alignItems: "center" },
};

export default withStyles(styles)(VotingControl);
