import React from "react";

//Icons
import Upvote from "./Upvote";
import Downvote from "./Downvote";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import { Classes } from "faunadb";

const VotingControl = (props) => {
  const {
    classes,
    post: { postId, likeCount, dislikeCount },
  } = props;

  return (
    <div className={classes.votingBox}>
      <Upvote postId={postId} />
      <div>{likeCount - dislikeCount}</div>

      <Downvote postId={postId} />
    </div>
  );
};

const styles = {
  votingBox: { display: "flex", flexDirection: "row", alignItems: "center" },
};

export default withStyles(styles)(VotingControl);
