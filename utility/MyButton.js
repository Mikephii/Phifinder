import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

//was getting an error about forwarding href to custom component using next/link.
//followed the implementation from https://github.com/vercel/next.js/issues/7915
const MyButton = React.forwardRef(function MyButton(props, ref) {
  const { children, onClick, btnClassName, tipClassName, tip, tipPlacement } =
    props;
  return (
    <Tooltip title={tip} className={tipClassName} placement={tipPlacement}>
      <IconButton
        onClick={onClick}
        className={btnClassName}
        style={{ padding: "0px" }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
});

export default MyButton;
