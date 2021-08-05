import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

//components
import MyButton from "../../utility/MyButton";

//MUi stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//redux stuff
import { connect } from "react-redux";
import { newPost, clearErrors } from "../../redux/actions/dataActions";

const NewPost = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    } else setErrors({});
  }, [props.UI.errors]);

  //destructure
  const {
    classes,
    UI: { loading },
  } = props;

  useEffect(() => {
    if (!props.UI.errors && !loading) {
      setDialogOpen(false);
      setPostBody("");
    }
  }, [props.UI.errors, loading]);

  //handlers
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setPostBody("");
    props.clearErrors();
    setDialogOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.newPost({ body: postBody });
  };

  const handleBodyChange = (event) => {
    setPostBody(event.target.value);
  };

  return (
    <Fragment>
      <MyButton onClick={openDialog} tip="Author a New Post!">
        <AddIcon color="secondary"></AddIcon>
      </MyButton>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={dialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          Author a New post
          <MyButton
            tip="close"
            onClick={closeDialog}
            btnClassName={classes.closeButton}
          >
            <CloseIcon></CloseIcon>
          </MyButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              value={postBody}
              name="body"
              type="text"
              label="Your Post"
              multiline
              rows="3"
              placeholder="blah blah blah..."
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleBodyChange}
              fullWidth
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Post
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  newPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const styles = (theme) => {
  return {
    ...theme.spreadMe,
    submitButton: { marginBottom: 10, float: "right" },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      float: "right",
      marginTop: "-13px",
      marginRight: "-15px",
    },
  };
};

const mapStateToProps = (state) => {
  return {
    UI: state.UI,
  };
};

const mapActionsToProps = { newPost, clearErrors };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NewPost));
