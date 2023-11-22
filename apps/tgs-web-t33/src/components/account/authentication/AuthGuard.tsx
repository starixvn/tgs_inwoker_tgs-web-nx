import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "@tgs-web-nx/core/features";
import { Route } from "@/router";
import Loading from "@/components/UI/Loading";

interface AuthGuard {
  children: React.ReactNode;
  route: Route;
}

export const AuthGuard = (props: AuthGuard) => {
  const { children, route } = props;
  const { isLogin } = useAuth();
  const history = useHistory();

  const checkIfHasAccessToViewPage = () => {
    return Boolean(isLogin || route.isAnonymousAllowed);
  };

  const [checked, setChecked] = useState(checkIfHasAccessToViewPage());

  const validate = async () => {
    const isHasAccessToViewPage = checkIfHasAccessToViewPage();
    if (!isHasAccessToViewPage) {
      history.push("/login");
    }

    setChecked(true);
  };

  useEffect(() => {
    validate().then();
  }, []);

  // if (isVendorIdNotValid || isNotHasAccessToShowPage || isHideFeature) {
  //   return <NotFound />;
  // }

  if (!checked) {
    return <Loading show={true} />;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
