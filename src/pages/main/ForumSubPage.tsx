import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ForumSubPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {};
  }, [pathname]);

  return <div>ForumSubPage</div>;
};

export default ForumSubPage;
