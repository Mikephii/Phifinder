import React, { Fragment, useState } from "react";
//import { Link } from "react-router-dom/";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import grey from "@material-ui/core/colors/grey";
//components
import MyButton from "../../utility/MyButton";

//redux
import { connect } from "react-redux";
import { deletePost } from "../../redux/actions/dataActions";

const DeletePost = (props) => {
  //local state
  const [dialogOpen, setDialogOpen] = useState(false);
  // destructure from props
  const { postId, classes } = props;
  // handlers
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const deletePostHandler = () => {
    props.deletePost(postId);
    closeDialog();
  };

  //render component
  return (
    <Fragment>
      <MyButton
        tip="Delete post"
        onClick={openDialog}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="disabled" />
      </MyButton>
      <Dialog open={dialogOpen} onClose={closeDialog} fullwidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePostHandler} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const styles = (theme) => {
  return {
    ...theme.spreadMe,
    deleteButton: { marginLeft: "auto" },
  };
};

const mapActionsToProps = { deletePost };

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(DeletePost));
