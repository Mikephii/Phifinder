import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
//components
import MyButton from "../utility/MyButton";

//MUi stuff
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

//rich text stuff
import MUIRichTextEditor from "mui-rte";
import { convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import parse from "html-react-parser";

//icons
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//redux stuff
import { connect } from "react-redux";
import {
  newPost,
  clearErrors,
  clearRecentlyAuthored,
} from "../redux/actions/dataActions";

import { stopLoadingUI } from "../redux/actions/uiActions";

const NewPost = (props) => {
  const [postBody, setPostBody] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [editor, setEditor] = useState({});
  const [HTML, setHTML] = useState("");
  const [plainText, setPlainText] = useState("");
  const [group, setGroup] = useState("");
  const [count, setCount] = useState(0);

  const Router = useRouter();

  //this useeffect only runs on dependancy change and not on intial render

  const { clearRecentlyAuthored, recentlyAuthored } = props;
  useEffect(() => {
    if (recentlyAuthored) {
      console.log("AYOOO");
      console.log(recentlyAuthored);
      let postDetails = recentlyAuthored;
      clearRecentlyAuthored();

      Router.push(
        `/profile/${postDetails.userHandle}/post/${postDetails.postId}`
      );
    }
  }, [Router, recentlyAuthored, clearRecentlyAuthored]);

  //set errors
  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    } else setErrors({});
  }, [props.UI.errors]);

  //sstopLoadingUI
  const { stopLoadingUI } = props;
  useEffect(() => {
    stopLoadingUI();
  }, [stopLoadingUI]);

  //destructure
  const {
    joinedGroups,
    classes,
    UI: { loading },
  } = props;

  //handlers

  const handleSubmit = (event) => {
    event.preventDefault();
    props.newPost({
      title: title,
      group: group,
      editor: editor,
      content: HTML,
      plainText: plainText,
      characterCount: count,
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const handleEditorChange = (editorState) => {
    //set editor state to editor data
    setEditor(editorState);
    //get content out of editor state
    const contentState = editorState.getCurrentContent();
    //convert to html and store in state
    setHTML(stateToHTML(contentState));

    setPlainText(editorState.getCurrentContent().getPlainText("\u0001"));

    let characterCount = editorState
      .getCurrentContent()
      .getPlainText("")
      .replace(/ /g, "").length;
    setCount(characterCount);
  };

  //groups options
  const groupOptions = joinedGroups ? (
    joinedGroups.map((group) => {
      return (
        <option key={group} value={group}>
          {group}
        </option>
      );
    })
  ) : (
    <option>please login</option>
  );

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Author a New post
          </Typography>
          <br />
          <form onSubmit={handleSubmit}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Group
              </InputLabel>
              <Select
                error={errors.group ? true : false}
                helperText={errors.group}
                native
                displayEmpty
                value={group}
                onChange={handleGroupChange}
                label="Group"
                inputProps={{
                  name: "group",
                  id: "group-select",
                }}
              >
                <option value="">Group</option>
                {groupOptions}
              </Select>
              <FormHelperText error={true}>
                {errors.group ? errors.group : null}
              </FormHelperText>
            </FormControl>
            <TextField
              value={title}
              name="title"
              type="text"
              label="Title..."
              variant="outlined"
              placeholder="blah blah blah..."
              error={errors.title ? true : false}
              helperText={errors.title}
              className={classes.textField}
              onChange={handleTitleChange}
              fullWidth
            ></TextField>
            <br />
            <MUIRichTextEditor
              toolbarButtonSize="small"
              label="Type something here..."
              inlineToolbar={true}
              onChange={handleEditorChange}
            />
            <FormHelperText error={true}>
              {errors.content ? errors.content : null}
            </FormHelperText>
            <br />
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
        </CardContent>
      </Card>
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
    submitButton: { marginBottom: 10 },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      float: "right",
      marginTop: "-13px",
      marginRight: "-15px",
    },
    card: { backgroundColor: "#1a1a1a", marginTop: 70 },
  };
};

const mapStateToProps = (state) => {
  return {
    UI: state.UI,
    recentlyAuthored: state.data.recentlyAuthored,
    joinedGroups: state.user.credentials.groups,
  };
};

const mapActionsToProps = {
  newPost,
  clearErrors,
  clearRecentlyAuthored,
  stopLoadingUI,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NewPost));
