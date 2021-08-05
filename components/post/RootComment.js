import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
//import { Link } from "react-router-dom";
import Link from "next/link";
//components
import CommentVotingControl from "./CommentVotingControl";
import CommentReplyForm from "./CommentReplyForm";
//rte
import FormHelperText from "@material-ui/core/FormHelperText";
import MUIRichTextEditor from "mui-rte";
import { stateToHTML } from "draft-js-export-html";
import parse from "html-react-parser";

//MUi stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//icons

//redux
import { connect } from "react-redux";
import GiveCommentCoinButton from "../CoinStuff/GiveCommentCoinButton";
import CommentCoinCount from "../CoinStuff/CommentCoinCount";

//--------------COMPONENT------------------
const RootComment = (props) => {
  const {
    depth,
    postId,
    commentID,
    HTML,
    createdAt,
    userHandle,
    userImage,
    coinCount,
  } = props.comment;
  const { classes, coins } = props;

  const [replyActive, setReplyActive] = useState(false);

  const replyActiveHandler = () => {
    setReplyActive(!replyActive);
  };

  const filterReplies = (commentReplies) => {
    return commentReplies
      .filter((comment) => comment.parentCommentID === commentID)
      .sort((a, b) => b.threadPower - a.threadPower);
  };

  // this gets rid of comment form after succesfully pushing a new comment to state
  useEffect(() => {
    setReplyActive(false);
  }, [props.commentReplies]);

  const repliesMarkup = filterReplies(props.commentReplies).map((comment) => {
    return (
      <RootComment
        key={comment.createdAt}
        comment={comment}
        commentReplies={props.commentReplies}
        classes={classes}
      />
    );
  });

  return (
    <div
      className={
        depth === 0
          ? `${classes.commentContainer} ${classes.margin}`
          : classes.commentContainer
      }
    >
      <div className={classes.lineDiv}></div>

      <div className={classes.commentHeader}>
        <div className={classes.circleDiv}></div>
        <Typography variant="body1" color="textSecondary">
          <Link href={`/users/${userHandle}`}>{userHandle}</Link>
        </Typography>
        <CommentCoinCount coinCount={coinCount} />
      </div>
      <div className={classes.commentContent}>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body1">{parse(HTML)}</Typography>
      </div>
      <div className={classes.commentFooter}>
        <CommentVotingControl
          comment={props.comment}
          likeCount={props.comment.likeCount}
          dislikeCount={props.comment.dislikeCount}
        />
        <Button className={classes.footerButton} onClick={replyActiveHandler}>
          Reply
        </Button>
        <GiveCommentCoinButton
          postId={postId}
          recipient={userHandle}
          commentID={commentID}
        />
      </div>
      <div className={classes.reply}>
        <CommentReplyForm active={replyActive} comment={props.comment} />
      </div>

      <div className={classes.replies}>{repliesMarkup}</div>
    </div>
  );
};
//--------------ENDCOMPONENT------------------

const styles = (theme) => {
  return {
    ...theme.spreadMe,
    commentImage: {
      maxWidth: "100%",
      height: 100,
      objectFit: "cover",
      borderRadius: "50%",
    },
    commentData: {
      marginLeft: "20px",
    },
    commentContainer: {
      border: "none",
      display: "grid",
      gridTemplateColumns: "15px 1fr",
      gridTemplateRows: "30px auto auto 20px auto auto ",
      gridTemplateAreas: ` 
      "line ."
    "line commentHeader "
      "line commentContent "
      "line commentFooter "
      "line commentReplyForm"
      "line replies"
      
      `,
    },
    commentHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gridArea: "commentHeader",
      width: 220,
    },
    commentContent: {
      marginTop: 0,
      display: "grid",
      gridArea: "commentContent",
      paddingBottom: 7,
      paddingLeft: 5,
    },
    commentFooter: {
      display: "flex",
      justifyContent: "flex-start",
      gridArea: "commentFooter",
      width: 220,
    },
    circleDiv: {
      width: 20,
      height: 20,
      backgroundColor: "secondary",
      border: "solid grey 1px",
      borderRadius: "50%",
      marginRight: 5,
    },
    lineDiv: {
      gridArea: "line",
      width: "60%",
      height: "100% -0px",
      borderRight: "solid grey 1px",
      marginTop: 30,
    },

    reply: {
      gridArea: "commentReplyForm",
    },
    replies: {
      gridArea: "replies",
    },
    margin: {
      marginBottom: 40,
    },
    chainEndSpacer: {
      width: "100%",
      height: 20,
    },
    footerButton: {
      textTransform: "none",
      color: "rgba(255,255,255,0.7)",
      minWidth: 0,
    },
  };
};

RootComment.propTypes = {
  comment: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RootComment);
