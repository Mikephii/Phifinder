import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
//import { Link } from "react-router-dom";
import Link from "next/link";
//components
import CommentVotingControl from "./CommentVotingControl";

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
import { newComment } from "../../redux/actions/dataActions";

//--------------COMPONENT------------------
const CommentReplyForm = (props) => {
  const { ancestors, depth, postId, commentID, rootCommentID } = props.comment;
  const { classes } = props;
  const { active } = props;

  const [commentHTML, setCommentHTML] = useState("");
  const [commentPlainText, setCommentPlainText] = useState("");

  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.errors);
    } else {
      setErrors({});
    }
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let comment = {
      HTML: commentHTML,
      plainText: commentPlainText,
      parentCommentID: commentID,
      rootCommentID: rootCommentID === "none" ? commentID : rootCommentID,
      ancestors: [...ancestors, commentID],
      likeCount: 0,
      dislikeCount: 0,
      threadPower: 0,
      characterCount: count,
      depth: depth + 1,
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

  return active ? (
    <div className={classes.reply}>
      <div className={classes.replyForm}>
        <form onSubmit={handleSubmit}>
          <FormHelperText error={true}>
            {errors.comment ? errors.comment : null}
          </FormHelperText>
          <MUIRichTextEditor
            toolbarButtonSize="small"
            label="Type something here..."
            inlineToolbar={true}
            onChange={handleEditorChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.replyButton}
          >
            Reply
          </Button>
        </form>
      </div>
      <div className={classes.lineDiv}></div>
    </div>
  ) : null;
};
//--------------ENDCOMPONENT------------------

const styles = (theme) => {
  return {
    ...theme.spreadMe,

    lineDiv: {
      gridArea: "line",
      width: "60%",
      height: "100%-0px",
      borderRight: "solid grey 1px",
      marginTop: 20,
    },
    reply: {
      display: "grid",
      gridTemplateColumns: "25px 1fr",
      gridTemplateAreas: `"line reply"`,
    },
    replyForm: {
      position: "relative",
      gridArea: "reply",
    },
    replyButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      float: "right",
    },
  };
};

CommentReplyForm.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    UI: state.UI,
    authenticated: state.user.authenticated,
  };
};

export default connect(mapStateToProps, { newComment })(
  withStyles(styles, { withTheme: true })(CommentReplyForm)
);
