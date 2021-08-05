import React from "react";

import { useRouter } from "next/router";

const CustomRouter = ({ href }) => {
  const Router = useRouter();

  useEffect(() => {
    Router.push(href);
  }, [href, Router]);

  return null;
};

export default CustomRouter;
