import React, { Fragment, useState } from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//components
import MyButton from "../../utility/MyButton";

//MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

//icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";
import { markNotificationsAsRead } from "../../redux/actions/userActions";

const Notifications = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { notifications } = props;

  dayjs.extend(relativeTime);

  const handleOpen = (event) => {
    setAnchorEl(event.target);
    console.log(event.target);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = props.notifications
      .filter((not) => {
        return not.read;
      })
      .map((not) => not.notificationId);
    props.markNotificationsAsRead(unreadNotificationsIds);
  };

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    let unreadNotificationCount = notifications.filter(
      (notification) => notification.read === false
    ).length;
    unreadNotificationCount > 0
      ? (notificationsIcon = (
          <Badge badgeContent={unreadNotificationCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const verb = notification.type === "like" ? "liked" : "commented on";
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? "primary" : "secondary";
        const icon =
          notification.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}{" "}
            <Link
              href={`/profile/${notification.recipient}/post/${notification.postId}`}
              passHref
            >
              <Typography color="default" variant="body1">
                {notification.sender} {verb} your post {time}
              </Typography>
            </Link>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={anchorEl ? true : false}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

Notifications.propTypes = {
  markNotificationsAsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    notifications: state.user.notifications,
  };
};

export default connect(mapStateToProps, { markNotificationsAsRead })(
  Notifications
);
