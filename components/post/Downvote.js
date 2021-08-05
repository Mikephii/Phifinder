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
  dislikePost,
  undislikePost,
  unlikePost,
} from "../../redux/actions/dataActions";

const LikeButton = (props) => {
  //destructure
  const {
    user: { authenticated },
    postId,
  } = props;

  const isDisliked = () => {
    if (
      props.user.dislikes &&
      props.user.dislikes.find((dislike) => dislike.postId === postId)
    ) {
      return true;
    } else return false;
  };

  const dislikePost = () => {
    props.dislikePost(postId);
  };

  const undislikePost = () => {
    console.log(postId);
    console.log(props.user.dislikes);
    props.undislikePost(postId);
  };

  const likeButton = !authenticated ? (
    <Link href="/login" passHref>
      <MyButton tip="Like Post">
        <ArrowDownwardIcon color="disabled"></ArrowDownwardIcon>
      </MyButton>
    </Link>
  ) : isDisliked() ? (
    <MyButton tip="unlike" onClick={undislikePost}>
      <ArrowDownwardIcon color="secondary" />
    </MyButton>
  ) : (
    <MyButton tip="like" onClick={dislikePost}>
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
  };
};

const mapActionsToProps = { dislikePost, undislikePost, unlikePost };

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
