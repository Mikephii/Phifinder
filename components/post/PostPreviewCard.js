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
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import SvgIcon from "@material-ui/core/SvgIcon";
import Button from "@material-ui/core/Button";
import parse from "html-react-parser";

//icons
import ChatIcon from "@material-ui/icons/Chat";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import CoinCount from "../CoinStuff/CoinCount";

//redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

dayjs.extend(relativeTime);

const PostPreviewCard = (props) => {
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
    coinCount,
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
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.postPreviewGrid}>
          <div className={`${classes.cardHeader} ${classes.paddingLeft}`}>
            <div className={classes.postDetails}>
              <Typography variant="body2" color="textSecondary">
                <Link href={`/p/${group}`} passHref>
                  <span style={{ color: "#FFC107" }}>
                    {" "}
                    /{group}
                    {"  "}
                  </span>
                </Link>
                posted by{" "}
                <Link href={`/profile/${userHandle}`}>{userHandle}</Link>{" "}
                {dayjs(createdAt).fromNow()}
              </Typography>
            </div>
          </div>
          <div className={classes.deleteButton}>{deleteButton}</div>

          <div
            onClick={routeToPost}
            className={`${classes.postContent} ${classes.paddingLeft}`}
          >
            <div className={classes.title}>
              <Typography
                component={"h2"}
                variant="h5"
                color="white"
                style={{ fontWeight: 500 }}
              >
                {title}
              </Typography>
            </div>
            <div className={classes.phiCoin}>
              <CoinCount coinCount={coinCount} postId={postId} />
            </div>

            <div className={classes.textPreview}>
              <Typography
                style={{ wrapText: "break-word" }}
                component={"span"}
                variant="body1"
                color="textSecondary"
              >
                {truncate(plainText, 200)}
              </Typography>
            </div>
          </div>
          <div className={`${classes.cardFooter} ${classes.paddingLeft}`}>
            <VotingControl post={props.post} />
            <Link
              href={`/profile/${props.post.userHandle}/post/${postId}`}
              passHref
            >
              <Button
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
                size="small"
              >
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
          <div className={classes.earnings}>
            <Typography variant="body2" color="textSecondary">
              This post has earned an estimated $7.35
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

//<PostDialog postId={postId} userHandle={userHandle}></PostDialog>

const styles = {
  card: {
    maxWidth: "100vw",
    display: "flex",
    marginBottom: 20,
    backgroundColor: "#202124",
    border: "0.5px solid transparent",
    "&:hover": {
      border: "solid #FFC107 0.5px",
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
    maxWidth: "100vw",
    padding: "0",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  paddingLeft: {
    paddingLeft: "10px",
  },

  postPreviewGrid: {
    display: "grid",
    gridTemplateColumns: "8px 1fr 22px",
    gridTemplateRows: "auto auto auto auto",
    gridTemplateAreas: ` 
    "votingBar cardHeader deleteButton"
      "votingBar postContent ."
      "votingBar cardFooter ."
      "votingBar earnings ."
      `,
  },
  cardHeader: {
    display: "flex",

    "grid-area": "cardHeader",
    color: "grey",
  },

  postDetails: { display: "flex", paddingTop: 12, paddingBottom: 4 },
  deleteButton: { gridArea: "deleteButton", marginLeft: "auto" },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    gridArea: "cardFooter",

    paddingTop: 10,
  },
  postContent: {
    "grid-area": "postContent",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridTemplateRows: "auto auto",
    gridTemplateAreas: `"title coins"
"body coins"`,
  },

  "@media screen and (max-width: 600px)": {
    postContent: {
      gridTemplateAreas: `"title coins"
"body body"`,
    },
  },

  title: {
    gridArea: "title",
  },

  textPreview: {
    gridArea: "body",
  },

  votingBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gridArea: "votingBar",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  phiCoin: {
    gridArea: "coins",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: "auto",
    border: "none",
  },
  earnings: {
    gridArea: "earnings",
    display: "flex",
    alignItems: "center",
    height: 24,
    paddingBottom: 10,
    marginLeft: 10,
  },
  chatIcon: {
    marginRight: 5,
    color: "rgba(255, 255, 255, 0.7)",
  },
  wrap: {
    wordWrap: "break-word",
  },
};

PostPreviewCard.propTypes = {
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
)(withStyles(styles)(PostPreviewCard));
