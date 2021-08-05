import React, { Fragment } from "react";
import NoImg from "../public/images/no-img.png";
import PropTypes from "prop-types";
import Image from "next/image";
//mui
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const PostSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.CardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => {
  return {
    ...theme.spreadMe,
    card: {
      display: "flex",
      marginBottom: 20,
      backgroundColor: "#1a1a1a",
    },
    CardContent: {
      width: "100%",
      flexDirection: "column",
      padding: 25,
    },
    cover: {
      minWidth: 100,
      height: 100,
      marginTop: 10,
      marginLeft: 10,
      objectFit: "cover",
    },
    handle: {
      borderRadius: 5,
      width: "20%",
      height: 18,
      backgroundColor: theme.palette.primary.main,
      opacity: 0.5,
      marginBottom: 7,
    },
    date: {
      borderRadius: 5,
      width: "15%",
      height: 12,
      backgroundColor: "rgba(255,255,255,0.25)",
      marginBottom: 10,
    },
    fullLine: {
      borderRadius: 5,
      width: "90%",
      height: 15,
      backgroundColor: "rgba(255,255,255,0.25)",
      marginBottom: 10,
    },
    halfLine: {
      borderRadius: 5,
      width: "45%",
      height: 15,
      backgroundColor: "rgba(255,255,255,0.25)",
      marginBottom: 10,
    },
  };
};

export default withStyles(styles, { withTheme: true })(PostSkeleton);
