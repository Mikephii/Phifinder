import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
//components
import MyButton from "../../utility/MyButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";
import VotingControl from "./VotingControl";
import GiveCoinButton from "../CoinStuff/GiveCoinButton";

//assets
import groupIcon from "../../public/images/groupIcon.svg";
//MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import SvgIcon from "@material-ui/core/SvgIcon";

import parse from "html-react-parser";

//icons
import ChatIcon from "@material-ui/icons/Chat";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";

//redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

dayjs.extend(relativeTime);

const FullPost = (props) => {
  const { classes } = props;
  const {
    post: {
      group,
      title,
      content,
      plainText,
      editor,
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

  function truncate(input, characterLength) {
    if (input.length > characterLength) {
      return input.substring(0, characterLength) + "...";
    }
    return input;
  }

  const Router = useRouter();
  const routeToPost = () => {
    Router.push(`/profile/${props.post.userHandle}/post/${postId}`);
  };

  return (
    <div className={classes.postPreviewGrid}>
      <div className={`${classes.cardHeader} ${classes.paddingLeft}`}>
        <div className={classes.postDetails}>
          <Typography variant="body2" color="primary">
            /{group}
            {"  "}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            posted by <Link href={`/profile/${userHandle}`}>{userHandle}</Link>{" "}
          </Typography>

          <div className={classes.timeStamp}>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.deleteButton}>{deleteButton}</div>

      <div
        onClick={routeToPost}
        className={`${classes.postContent} ${classes.paddingLeft}`}
      >
        <Typography component={"h2"} variant="h5" color="white">
          {title}
        </Typography>
        <div className={classes.textPreview}>
          <Typography component={"span"} variant="body1" color="textSecondary">
            {parse(content)}
          </Typography>
        </div>
      </div>
      <div className={`${classes.cardFooter} ${classes.paddingLeft}`}>
        <VotingControl post={props.post} />
        <Link
          href={`/profile/${props.post.userHandle}/post/${postId}`}
          passHref
        >
          <Button style={{ color: "rgba(255, 255, 255, 0.7)" }} size="small">
            <ChatIcon
              color="disabled"
              fontSize="small"
              className={classes.chatIcon}
            ></ChatIcon>

            {commentCount}
          </Button>
        </Link>

        <GiveCoinButton postId={postId} recipient={userHandle} />
      </div>
    </div>
  );
};

//<PostDialog postId={postId} userHandle={userHandle}></PostDialog>

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.09)",
    border: "1px solid transparent",
    "&:hover": {
      border: "solid #FFC107 1px",
      cursor: "pointer",
    },
  },
  postImage: {
    minWidth: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    objectFit: "cover",
  },
  content: {
    width: "100%",
    padding: "0",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  paddingLeft: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },

  postPreviewGrid: {
    display: "grid",
    gridTemplateColumns: "20px 1fr 20px",
    gridTemplateRows: "35px auto auto",
    gridTemplateAreas: ` 
    " .cardHeader deleteButton"
      ". postContent ."
      ". cardFooter ."
      `,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    "grid-area": "cardHeader",
    color: "grey",
    "white-space": "pre",
  },

  postDetails: { display: "flex", paddingTop: 12, paddingBottom: 4 },
  deleteButton: { gridArea: "deleteButton", marginLeft: "auto" },
  cardFooter: { display: "flex", alignItems: "center", gridArea: "cardFooter" },
  postContent: { "grid-area": "postContent" },
  votingBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    gridArea: "votingBar",
  },
  testCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "solid #FFC107 2px",
    color: "#FFC107",
    fontSize: 10,
  },
  estimatedEarnings: {
    marginLeft: 10,
    fontWeight: 900,
  },
};

FullPost.propTypes = {
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
)(withStyles(styles)(FullPost));
