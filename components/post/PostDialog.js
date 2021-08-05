import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
//import { Link } from "react-router-dom";
import Link from "next/link";

//components
import MyButton from "../../utility/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
//MUi stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//icons
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
//redux
import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataActions";

const PostDialog = (props) => {
  //destructure
  const {
    postId,
    classes,
    UI: { loading },
  } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");

  const openDialog = () => {
    //changes the url to single post page route for sharing
    setOldPath(window.location.pathname);
    const newPath = `/profile/${props.post.userHandle}/post/${postId}`;

    window.history.pushState(null, null, newPath);

    setDialogOpen(true);
    props.getPost(postId);
  };

  const closeDialog = () => {
    window.history.pushState(null, null, oldPath);
    setDialogOpen(false);
    props.clearErrors();
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={150} thickness={2}></CircularProgress>
    </div>
  ) : (
    <Grid container spacing={4} justify="center">
      <Grid item sm={5}>
        <img
          src={props.post.userImage}
          alt=""
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Link href={`/users/${props.post.userHandle}`} passHref>
          <Typography color="primary" variant="h5">
            By: {props.post.userHandle}
          </Typography>
        </Link>

        <hr className={classes.invisibleSeperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(props.post.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body1">{props.post.body}</Typography>
        <LikeButton postId={postId} />
        <span>{props.post.likeCount} likes</span>
        <MyButton tip="comment">
          <ChatIcon color="primary"></ChatIcon>
        </MyButton>
        <span>{props.post.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeperator} />
      <CommentForm postId={postId} />
      <Comments comments={props.post.comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={openDialog}
        tip="See Full Post"
        btnClassName={classes.expandButton}
      >
        <UnfoldMoreIcon color="primary" />
      </MyButton>
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle className={classes.dialogTitle}>
          Post Title
          <MyButton
            tip="close"
            onClick={closeDialog}
            btnClassName={classes.closeButton}
          >
            <CloseIcon></CloseIcon>
          </MyButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
};

const styles = (theme) => {
  return {
    ...theme.spreadMe,
    closeButton: {
      float: "right",
      marginTop: "-13px",
      marginRight: "-15px",
    },

    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover",
    },
    dialogContent: {
      padding: 20,
    },
    expandButton: {
      float: "right",
      marginRight: "2px",
    },
    spinnerDiv: {
      textAlign: "center",
      margin: "10px 0px 10px 0px",
    },
  };
};

const mapStateToProps = (state) => {
  return { post: state.data.post, UI: state.UI };
};

const mapActionsToProps = { getPost, clearErrors };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(PostDialog));
