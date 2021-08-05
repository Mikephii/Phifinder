import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//Components
import Post from "../../components/post/Post";
import PostPreviewCard from "../../components/post/PostPreviewCard";
import Profile from "../../components/profile/Profile";
import PostSkeleton from "../../utility/PostSkeleton";
import FeedController from "../../components/layout/FeedController";
//MUIstuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core";
//redux stuff
import { connect } from "react-redux";
import { getPostsFromGroup } from "../../redux/actions/dataActions";

const Home = (props) => {
  //not quite the same as compinent did mount. keep an eye out for flikering etc
  //

  const { getPostsFromGroup, classes, group } = props;
  const userHandle = props.userHandle ? props.userHandle : "guest";
  useEffect(() => {
    if (userHandle) {
      getPostsFromGroup(group, userHandle);
    }
  }, [getPostsFromGroup, userHandle, group]);

  //destructure posts array and loading boolean from props.data passed in from react-redux connect
  const { loading } = props.data;
  const { posts } = props;

  console.log(props.group);

  let recentPostsMarkup = !loading ? (
    posts.map((post) => {
      return (
        <PostPreviewCard
          key={post.postId}
          post={post}
          coinCount={post.coinCount}
        ></PostPreviewCard>
      );
    })
  ) : (
    <PostSkeleton />
  );

  return (
    <Fragment>
      <FeedController group={group} />
      <Grid
        style={{ border: "solid red 1px" }}
        container
        spacing={0}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography variant="h5" color="primary">
                p/{props.group}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {recentPostsMarkup}
        </Grid>
      </Grid>
    </Fragment>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    userHandle: state.user.credentials.handle,
    posts: state.data.posts,
  };
};

const mapActionsToProps = { getPostsFromGroup };

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.09)",
    border: "1px solid transparent",
  },
  content: {
    width: "100%",
    paddingTop: "2px",
    paddingLeft: 20,
    "&:last-child": {
      paddingBottom: 5,
    },
  },
};

export default withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(Home)
);

//get serverside props from next
export async function getServerSideProps(context) {
  const group = context.params.group;

  return {
    props: { group: group }, // will be passed to the page component as props
  };
}
