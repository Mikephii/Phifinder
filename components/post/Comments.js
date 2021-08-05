import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
//import { Link } from "react-router-dom";
import Link from "next/link";
//components
import RootComment from "./RootComment";
//rte
import FormHelperText from "@material-ui/core/FormHelperText";
import MUIRichTextEditor from "mui-rte";
import { stateToHTML } from "draft-js-export-html";
import parse from "html-react-parser";

//MUi stuff
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//icons

//redux
import { connect } from "react-redux";

//--------------COMPONENT------------------
const Comments = ({ classes, commentReplies, coins }) => {
  const getRootComments = (comments) => {
    return comments
      .filter((comment) => comment.depth === 0)
      .sort((a, b) => b.threadPower - a.threadPower);
  };

  return (
    <Grid container alignItems="center">
      {getRootComments(commentReplies).map((comment) => {
        return (
          <Grid item sm={12} key={comment.createdAt}>
            <RootComment
              comment={comment}
              commentReplies={commentReplies}
              key={comment.createdAt}
            />
          </Grid>
        );
      })}
    </Grid>
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
  };
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Comments);
