import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import PropTypes from "prop-types";
//MUI stuff
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import { SvgIcon, Typography } from "@material-ui/core";

//icons

//redux stuff
import { connect } from "react-redux";
import { coinComment, uncoinComment } from "../../redux/actions/dataActions";

const GiveCommentCoinButton = (props) => {
  const {
    postId,
    commentID,
    recipient,
    donor,
    coins,
    classes,
    profileCommentCoins,
  } = props;

  const commentCoins = profileCommentCoins ? profileCommentCoins : coins;

  const giftedCoins = (coins) => {
    if (coins) {
      return coins.filter((coin) => coin.commentID === commentID);
    } else return [];
  };

  const coinComment = () => {
    if (giftedCoins(commentCoins).length < 3) {
      props.coinComment(
        commentID,
        postId,
        recipient,
        props.user.credentials.handle
      );
    } else {
      props.uncoinComment(
        commentID,
        postId,
        recipient,
        props.user.credentials.handle
      );
    }
  };

  const CoinSvg = (
    <SvgIcon
      className={classes.svg}
      color="primary"
      style={{ fontSize: 8 }}
      version="1.1"
      viewBox="0 0 135.4 131.601"
      overflow="visible"
      transform="translate(-13, -10)"
    >
      <path d="M 389.521 236.867 C 389.521 275.679 372.528 313.695 347.211 339.011 C 321.895 364.328 283.879 381.321 245.067 381.321 C 206.255 381.321 168.239 364.328 142.923 339.011 C 117.606 313.695 100.613 275.679 100.613 236.867 C 100.613 198.055 117.606 160.039 142.923 134.723 C 168.239 109.406 206.255 92.413 245.067 92.413 C 283.879 92.413 321.895 109.406 347.211 134.723 C 372.528 160.039 389.521 198.055 389.521 236.867 Z M 325.998 155.936 C 304.462 134.4 277.75 122.413 245.067 122.413 C 212.384 122.413 185.672 134.4 164.136 155.936 C 142.6 177.472 130.613 204.184 130.613 236.867 C 130.613 269.55 142.6 296.262 164.136 317.798 C 185.672 339.335 212.384 351.321 245.067 351.321 C 277.75 351.321 304.462 339.335 325.998 317.798 C 347.535 296.262 359.521 269.55 359.521 236.867 C 359.521 204.184 347.535 177.472 325.998 155.936 Z M 235.078 275.968 L 235.078 261.16 C 235.078 240.483 235.614 225.831 236.695 217.204 C 237.772 208.581 239.557 201.094 242.055 194.742 C 246.584 183.676 252.983 175.246 261.255 169.453 C 269.527 163.659 279.383 160.763 290.827 160.763 C 304.76 160.763 316.431 165.568 325.834 175.173 C 335.237 184.781 339.939 197.175 339.939 212.357 C 339.939 233.289 332.744 250.313 318.362 263.438 C 303.981 276.562 285.069 283.467 261.628 284.153 L 261.628 337.006 L 235.078 337.006 L 235.078 284.153 C 208.007 282.692 187.026 276.241 172.133 264.787 C 157.241 253.337 149.794 237.92 149.794 218.532 C 149.794 200.523 154.634 186.392 164.322 176.139 C 174.006 165.889 187.173 160.763 203.825 160.763 C 211.867 160.763 219.057 162.329 225.402 165.457 C 231.746 168.586 237.294 173.363 242.055 179.792 L 233.716 183.654 C 230.426 179.191 226.655 175.888 222.406 173.741 C 218.156 171.594 213.308 170.52 207.869 170.52 C 198.231 170.52 191.376 174.062 187.294 181.141 C 183.213 188.224 181.172 200.389 181.172 217.643 C 181.172 234.639 185.76 248.115 194.946 258.073 C 204.127 268.031 217.503 273.995 235.078 275.968 Z M 261.628 276.225 C 280.963 276.225 296.79 270.327 309.114 258.524 C 321.438 246.721 327.602 231.466 327.602 212.751 C 327.602 199.792 324.35 189.428 317.851 181.659 C 311.348 173.89 302.895 170.006 292.495 170.006 C 281.072 170.006 273.072 173.912 268.496 181.723 C 263.916 189.533 261.628 203.737 261.628 224.338 L 261.628 276.225 Z" />
    </SvgIcon>
  );

  const coinsIcons =
    giftedCoins(commentCoins).length > 0 ? (
      <div className={classes.giftedCoins}>
        <Typography variant="body1" color="primary">
          +{giftedCoins(commentCoins).length}
        </Typography>
      </div>
    ) : null;

  return (
    <div className={classes.container}>
      <Button className={classes.footerButton} onClick={coinComment}>
        {giftedCoins(commentCoins).length < 3 ? "Coin" : "unCoin"}
      </Button>
      {coinsIcons}
    </div>
  );
};

GiveCommentCoinButton.propTypes = {};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    coins: state.data.post.commentCoins,
  };
};

const styles = {
  giftedCoins: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
  coinSvgContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "2px 0px",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  svg: { margin: 6 },
  footerButton: {
    textTransform: "none",
    color: "rgba(255,255,255,0.7)",
    maxHeight: "100%",
    minWidth: 0,
    margin: 0,
  },
};

const mapActionsToProps = { coinComment, uncoinComment };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles, { withTheme: true })(GiveCommentCoinButton));
