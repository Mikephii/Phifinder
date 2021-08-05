import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import FormHelperText from "@material-ui/core/FormHelperText";
import MUIRichTextEditor from "mui-rte";
import { stateToHTML } from "draft-js-export-html";

//redux
import { connect } from "react-redux";
import { newComment } from "../../redux/actions/dataActions";

const CommentForm = (props) => {
  const [commentBody, setCommentBody] = useState("");
  const [commentHTML, setCommentHTML] = useState("");
  const [commentPlainText, setCommentPlainText] = useState("");
  const [parentCommentID, setParentCommentID] = useState("none");
  const [count, setCount] = useState(0);

  const [errors, setErrors] = useState({});

  //destructure
  const { classes, authenticated, postId } = props;

  //lifecycle
  //set errors to local state for ternery operators
  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    } else {
      setErrors({});
    }
  }, [props.UI.errors]);

  //handlers
  const handleSubmit = (event) => {
    event.preventDefault();

    let comment = {
      HTML: commentHTML,
      plainText: commentPlainText,
      parentCommentID: "none",
      rootCommentID: "none",
      ancestors: [],
      likeCount: 0,
      dislikeCount: 0,
      threadPower: 0,
      characterCount: count,
      depth: 0,
    };
    props.newComment(postId, comment);
  };

  const handleEditorChange = (editorState) => {
    //get content out of editor state
    const contentState = editorState.getCurrentContent();
    //convert to html and store in state
    setCommentHTML(stateToHTML(contentState).split("<p><br></p>").join(""));
    console.log(commentHTML);
    setCommentPlainText(editorState.getCurrentContent().getPlainText("\u0001"));

    let characterCount = editorState
      .getCurrentContent()
      .getPlainText("")
      .replace(/ /g, "").length;

    setCount(characterCount);
  };

  const commentFormMarkup = authenticated ? (
    <div className={classes.commentFormGrid}>
      <div className={classes.seperator}></div>
      <div className={classes.commentFormContainer}>
        <form onSubmit={handleSubmit}>
          <MUIRichTextEditor
            toolbarButtonSize="small"
            label="Type something here..."
            inlineToolbar={true}
            onChange={handleEditorChange}
          />
          <FormHelperText error={true}>
            {errors.content ? errors.content : null}
          </FormHelperText>
          <Button
            type="submit"
            variant="outlined"
            color=""
            className={classes.button}
          >
            Reply
          </Button>
        </form>
      </div>
    </div>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  newComment: PropTypes.func.isRequired,
};

const styles = (theme) => {
  return {
    ...theme.spreadMe,
    commentFormGrid: {
      marginTop: "20px",
      display: "grid",
      gridTemplateColumns: "20px 1fr 20px",
      gridTemplateRows: "5px 1fr",
      gridTemplateAreas: `". seperator ." 
    ". commentForm ."
      
      `,
    },
    commentFormContainer: {
      gridArea: "commentForm",
      position: "relative",
    },
    lineDiv: {
      gridArea: "line",
      width: "60%",
      height: "100%",
      borderRight: "solid grey 1px",
    },
    button: {
      position: "absolute",
      bottom: 4,
      right: 0,
      float: "right",
    },
    seperator: {
      gridArea: "seperator",
      borderTop: "solid 2px #2a2a2a",
    },
  };
};

const mapStateToProps = (state) => {
  return {
    UI: state.UI,
    authenticated: state.user.authenticated,
  };
};

export default connect(mapStateToProps, { newComment })(
  withStyles(styles, { withTheme: true })(CommentForm)
);
