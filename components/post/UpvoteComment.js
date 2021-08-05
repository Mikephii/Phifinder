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
import { likeComment, unlikeComment } from "../../redux/actions/dataActions";

const LikeButton = (props) => {
  //destructure
  const {
    user: { authenticated },
    comment: { postId, commentID, ancestors },
    userCommentLikes,
  } = props;

  const isLiked = () => {
    if (
      userCommentLikes &&
      userCommentLikes.find((like) => like.commentID === commentID)
    ) {
      return true;
    } else return false;
  };

  const likeComment = () => {
    props.likeComment(props.comment, props.user.credentials.handle);
  };

  const unlikeComment = () => {
    props.unlikeComment(props.comment, props.user.credentials.handle);
  };

  const likeButton = !authenticated ? (
    <Link href="/login" passHref>
      <MyButton tip="Like Post">
        <ArrowUpwardIcon color="disabled"></ArrowUpwardIcon>
      </MyButton>
    </Link>
  ) : isLiked() ? (
    <MyButton tip="unlike" onClick={unlikeComment}>
      <ArrowUpwardIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="like" onClick={likeComment}>
      <ArrowUpwardIcon color="disabled" />
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
    post: state.data.post,
    userCommentLikes: state.data.post.userCommentLikes,
    user: state.user,
  };
};

const mapActionsToProps = { likeComment, unlikeComment };

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
