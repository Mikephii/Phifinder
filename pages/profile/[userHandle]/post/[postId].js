import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

//Components

import FullPost from "../../../../components/post/FullPost";
import StaticProfile from "../../../../components/profile/StaticProfile";
import CommentForm from "../../../../components/post/CommentForm";
import Comments from "../../../../components/post/Comments";
//MUIstuff
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/styles/withStyles";
//redux stuff
import { connect } from "react-redux";
import { getPost } from "../../../../redux/actions/dataActions";

const SinglePostPage = (props) => {
  const postId = props.postId;

  const { classes } = props;

  //local state for profile data
  const [profile, setProfile] = useState({});
  const [comments, setComments] = useState([]);
  const [commentReplies, setCommentReplies] = useState([]);

  useEffect(() => {
    if (props.data.post.comments) {
      setComments(props.data.post.comments);
    } else {
      setComments([]);
    }
    console.log(props.data.post.comments);
  }, [props.data.post.comments]);

  //this one is for the replies tree
  useEffect(() => {
    if (props.commentReplies) {
      setCommentReplies(props.commentReplies);
    } else {
      setCommentReplies([]);
    }
    console.log(props.commentReplies);
  }, [props.commentReplies]);

  //onLoad axios get the profile data using the url userHandle and set it to local state
  const userHandle = props.userHandle;
  const getPost = props.getPost;
  const credentials = props.user.credentials;
  useEffect(() => {
    //this one is the dataaction that gets the posts from the userHandle an sets to redux state array for posts

    console.log(credentials.handle);
    getPost(postId, credentials.handle ? credentials.handle : "guest");

    axios
      .get(`/user/${userHandle}`)
      .then((response) => {
        setProfile(response.data.user);
      })
      .catch((err) => console.log(err));
    console.log("echks");
  }, [userHandle, getPost, postId, credentials.handle]);

  return (
    <Grid container spacing={0}>
      <Grid item sm={12}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            {props.data.post.content ? (
              <FullPost post={props.data.post} />
            ) : null}

            <CommentForm postId={postId} />
            <Comments commentReplies={commentReplies} />
          </CardContent>
        </Card>
        <Card className={classes.card}></Card>
      </Grid>
    </Grid>
  );
};

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
  },
  image: {
    minWidth: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    objectFit: "cover",
  },
  content: {
    padding: 10,
    width: "100%",
  },
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    user: state.user,
    commentReplies: state.data.post.commentReplies,
  };
};

const mapActionsToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SinglePostPage));

//get serverside props from next
export async function getServerSideProps(context) {
  const postId = context.params.postId;
  const userHandle = context.params.userHandle;
  return {
    props: { postId, userHandle }, // will be passed to the page component as props
  };
}
