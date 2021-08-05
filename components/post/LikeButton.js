import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import PropTypes from "prop-types";
//MUI stuff

//icons
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";
import ThumbUp from "@material-ui/icons/ThumbUp";

//components
import MyButton from "../../utility/MyButton";

//redux stuff
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

const LikeButton = (props) => {
  //destructure
  const {
    user: { authenticated },
    postId,
  } = props;

  const isLiked = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.postId === postId)
    ) {
      return true;
    } else return false;
  };

  const likePost = () => {
    props.likePost(postId);
  };

  const unlikePost = () => {
    props.unlikePost(postId);
  };

  const likeButton = !authenticated ? (
    <Link href="/login" passHref>
      <MyButton tip="Like Post">
        <ThumbUpOutlined color="primary"></ThumbUpOutlined>
      </MyButton>
    </Link>
  ) : isLiked() ? (
    <MyButton tip="unlike" onClick={unlikePost}>
      <ThumbUp color="secondary" />
    </MyButton>
  ) : (
    <MyButton tip="like" onClick={likePost}>
      <ThumbUpOutlined color="primary" />
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
  };
};

const mapActionsToProps = { likePost, unlikePost };

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
