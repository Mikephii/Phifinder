import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import PropTypes from "prop-types";
//MUI stuff

//icons
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";
import ThumbUp from "@material-ui/icons/ThumbUp";

//components
import MyButton from "../../utility/MyButton";

//redux stuff
import { connect } from "react-redux";
import {
  dislikeComment,
  undislikeComment,
} from "../../redux/actions/dataActions";

const LikeButton = (props) => {
  //destructure
  const {
    user: { authenticated },
    comment: { postId, commentID, ancestors },
    userCommentDislikes,
  } = props;

  const isDisliked = () => {
    if (
      userCommentDislikes &&
      userCommentDislikes.find((dislike) => dislike.commentID === commentID)
    ) {
      return true;
    } else return false;
  };

  const dislikeComment = () => {
    props.dislikeComment(props.comment, props.user.credentials.handle);
  };

  const undislikeComment = () => {
    props.undislikeComment(props.comment, props.user.credentials.handle);
  };

  const likeButton = !authenticated ? (
    <Link href="/login" passHref>
      <MyButton tip="Like Post">
        <ArrowDownwardIcon color="disabled"></ArrowDownwardIcon>
      </MyButton>
    </Link>
  ) : isDisliked() ? (
    <MyButton tip="unlike" onClick={undislikeComment}>
      <ArrowDownwardIcon color="secondary" />
    </MyButton>
  ) : (
    <MyButton tip="like" onClick={dislikeComment}>
      <ArrowDownwardIcon color="disabled" />
    </MyButton>
  );

  return likeButton;
};

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.data.post,
    userCommentDislikes: state.data.post.userCommentDislikes,
  };
};

const mapActionsToProps = { dislikeComment, undislikeComment };

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
