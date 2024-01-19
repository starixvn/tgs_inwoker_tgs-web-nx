import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      const pathname = history.location.pathname;

      if (pathname.includes("/main")) return;

      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export default ScrollToTop;
