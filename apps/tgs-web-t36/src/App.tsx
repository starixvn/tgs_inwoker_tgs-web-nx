import React, { Suspense, useRef } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import config from "@tgs-web-nx/config";
import { ScrollToTop } from "@tgs-web-nx/utils";
import { AppHistory, useAccountStore } from "@tgs-web-nx/core";
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
  RouteContextProvider,
  UserWalletInfoContextProvider,
} from "@tgs-web-nx/core/features";
import { RouteType } from "@tgs-web-nx/types";
import LiveChat from "./components/tools/LiveChat";
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




const App: React.FC = () => {
  const { isLoading } = useInitSite();
  const gameTypeList = useGameTypeList();
  const routeRef = useRef<RouteType>();

  const currentRoute = routeRef.current;

  if (isLoading) {
    return <Loading show={true} opacity={1} noShrink={true} />;
  }

  return (
    <Router history={AppHistory}>
      <RouteContextProvider route={currentRoute}>
        <AuthContextProvider>
          <PageNameContextProvider>
            <HeaderContextProvider>
              <PopupContextProvider>
                <AuthDialogContextProvider>
                  <UserWalletInfoContextProvider>
                    <HomeGameContextProvider gameTypeList={gameTypeList}>
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
    </Router>
  );
};

export default App;
