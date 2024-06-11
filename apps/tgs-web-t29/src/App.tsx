import React, { Suspense, useRef } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { ScrollToTop } from "@tgs-web-nx/utils";
import { AppHistory } from "@tgs-web-nx/core";
import { useInitSite } from "@tgs-web-nx/core/hooks";
import {
  AuthContextConsumer,
  AuthContextProvider,
  AuthDialogContextProvider,
  AuthGuard,
  HeaderContextProvider,
  HomeGameContextProvider,
  PageNameContextProvider,
  PopupContextProvider,
  queryClient,
  RouteContextProvider,
  UserWalletInfoContextProvider,
} from "@tgs-web-nx/core/features";
import { RouteType } from "@tgs-web-nx/types";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import { QueryClientProvider } from "@tanstack/react-query";
import LiveChat from "./components/tools/LiveChat";
import FacebookPixel from "./components/project/FacebookPixel";
import { routes } from "@/router";
import PopupAlertModal from "@/components/project/Popup/PopupAlertDialog";
import PopupAnnouncement from "@/components/project/Popup/PopupAnnouncement";
import PopupPromotion from "@/components/project/Popup/PopupPromotion";

import LayoutProvider from "@/layouts/LayoutProvider";
import Loading from "@/components/UI/Loading";
import LoginDialog from "@/components/project/auth/Dialogs/LoginDialog";
import RegisterDialog from "@/components/project/auth/Dialogs/RegisterDialog";
import ForgotPasswordDialog from "@/components/project/auth/Dialogs/ForgotPasswordDialog";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import RegisterV2InitPhoneDialog from "@/components/project/auth/Dialogs/RegisterV2InitPhoneDialog";
import RegisterV2InitEmailDialog from "@/components/project/auth/Dialogs/RegisterV2InitEmailDialog";
import RegisterV2SetRealNameDialog from "@/components/project/auth/Dialogs/RegisterV2SetRealName";

const App: React.FC = () => {
  const { isLoading } = useInitSite();
  const gameTypeList = useGameTypeList();
  const routeRef = useRef<RouteType>();

  const currentRoute = routeRef.current;
  const isDisableWebPinchAction = brandConfig[mapBrandName(config.brand)].isDisableWebPinchAction;

  if (isDisableWebPinchAction) {
    document.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches && event.touches.length > 1) {
          // 禁止多指觸控
          event.preventDefault();
        }
      },
      { passive: false },
    );
  }
  if (isLoading) {
    return <Loading show={true} opacity={1} noShrink={true} />;
  }
  return (
    <Router history={AppHistory}>
      <QueryClientProvider client={queryClient}>
        <RouteContextProvider route={currentRoute}>
          <AuthContextProvider>
            <PageNameContextProvider>
              <HeaderContextProvider>
                <PopupContextProvider>
                  <AuthDialogContextProvider>
                    <UserWalletInfoContextProvider>
                      <HomeGameContextProvider gameTypeList={gameTypeList}>
                        <FacebookPixel />
                        <ScrollToTop />
                        <Switch>
                          {routes.map((route, index) => {
                            return (
                              <Route
                                exact
                                key={index}
                                path={route.path}
                                render={(props) => {
                                  return (
                                    <LayoutProvider route={route}>
                                      <AuthGuard route={route}>
                                        <Suspense
                                          fallback={
                                            <Loading show={true} opacity={1} noShrink={true} />
                                          }
                                        >
                                          <route.component route={route} />
                                        </Suspense>
                                      </AuthGuard>
                                    </LayoutProvider>
                                  );
                                }}
                              />
                            );
                          })}
                          <Redirect to="/" />
                        </Switch>

                        <LiveChat
                          license={config.features.LiveChatVendor.license}
                          vendor={config.features.LiveChatVendor.brand}
                          group={
                            config.features.LiveChatVendor.group
                              ? config.features.LiveChatVendor.group
                              : "0"
                          }
                        />

                        <PopupAnnouncement />
                        <PopupPromotion />

                        <PopupAlertModal />
                        {/*<FloatingToolIcons />*/}
                        <LoginDialog />
                        <RegisterDialog />
                        <RegisterV2InitPhoneDialog />
                        <RegisterV2InitEmailDialog />
                        <RegisterV2SetRealNameDialog />
                        <ForgotPasswordDialog />

                        <AuthContextConsumer>
                          {(authState) => <Loading show={authState.isAuthLoading} noShrink={true} />}
                        </AuthContextConsumer>
                      </HomeGameContextProvider>
                    </UserWalletInfoContextProvider>
                  </AuthDialogContextProvider>
                </PopupContextProvider>
              </HeaderContextProvider>
            </PageNameContextProvider>
          </AuthContextProvider>
        </RouteContextProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
