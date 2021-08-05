import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//components
import MyButton from "../../utility/MyButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";
//MUI stuff
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";

import parse from "html-react-parser";

//icons
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

dayjs.extend(relativeTime);

const Post = (props) => {
  const { classes } = props;
  const {
    post: {
      group,
      title,
      content,
      createdAt,
      userImage,
      userHandle,
      postId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
  } = props;

  const noImg =
    "https://firebasestorage.googleapis.com/v0/b/socialape-67dbc.appspot.com/o/no-img.png?alt=media";

  const deleteButton =
    authenticated && handle === userHandle ? (
      <DeletePost postId={postId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.postImage}
        image={userImage ? userImage : noImg}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <Link href={`/profile/${userHandle}`} passHref>
          <Typography variant="h5" color="primary">
            {userHandle}
          </Typography>
        </Link>

        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <div className={classes.hideText}>
          <Typography component={"span"} variant="body1" color="textSecondary">
            {parse(content)}
          </Typography>
        </div>
        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <Link
          href={`/profile/${props.post.userHandle}/post/${postId}`}
          passHref
        >
          <MyButton tip="comment">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>
        </Link>
        <span>{commentCount}</span>
      </CardContent>
    </Card>
  );
};

//<PostDialog postId={postId} userHandle={userHandle}></PostDialog>

const styles = {
  card: { display: "flex", marginBottom: 20 },
  postImage: {
    minWidth: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    objectFit: "cover",
  },
  content: {
    padding: 25,
    width: "100%",
  },
  hideText: {
    height: "4.6em",
    overflow: "hidden",
  },
};

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = { likePost, unlikePost };

//exports the post with styles applied from styles object
//adds properties variable '.classes'
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
