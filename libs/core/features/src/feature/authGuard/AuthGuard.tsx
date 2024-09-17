import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RouteType } from "@tgs-web-nx/types";
import { Loading } from "@tgs-web-nx/core";
import { useAuth } from "../useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
  route: RouteType;
}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children, route } = props;
  const { isLogin, goToLogin } = useAuth();

  const checkIfHasAccessToViewPage = () => {
    return Boolean(isLogin || route.isAnonymousAllowed);
  };

  const [checked, setChecked] = useState(checkIfHasAccessToViewPage());

  const validate = async () => {
    const isHasAccessToViewPage = checkIfHasAccessToViewPage();
    if (!isHasAccessToViewPage) {
      goToLogin();
      return;
    }
    setChecked(true);
  };

  useEffect(() => {
    validate().then();
  }, []);

  useEffect(() => {
    if (isLogin) {
      setChecked(true);
    }
  }, [isLogin]);

  // if (isVendorIdNotValid || isNotHasAccessToShowPage || isHideFeature) {
  //   return <NotFound />;
  // }

  if (!checked) {
    return <></>;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
