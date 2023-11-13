import React, { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import config from "@tgs-web-nx/config";
import { ScrollToTop } from "@tgs-web-nx/utils";
import { AppHistory, useAccountStore } from "@tgs-web-nx/core";
import { useInitSite } from "@tgs-web-nx/core/hooks";
import {
  AuthContextConsumer,
  AuthContextProvider,
  AuthDialogContextProvider,
  HeaderContextProvider,
  HomeGameContextProvider,
  PageNameContextProvider,
  PopupContextProvider,
} from "@tgs-web-nx/core/features";
import ForcedVerification from "./components/project/ForcedVerification";
import LiveChat from "./components/tools/LiveChat";
import { routes } from "@/router";
import PopupAlertModal from "@/components/project/Popup/PopupAlertDialog";
import PopupAnnouncement from "@/components/project/Popup/PopupAnnouncement";
import PopupPromotion from "@/components/project/Popup/PopupPromotion";

import LayoutProvider from "@/layouts/LayoutProvider";
import { AuthGuard } from "@/components/account/authentication/AuthGuard";
import FloatingToolIcons from "@/components/project/FloatingToolIcons";
import Loading from "@/components/UI/Loading";
import LoginDialog from "@/components/project/LoginDialog";
import RegisterDialog from "@/components/project/RegisterDialog";
import ForgotPasswordDialog from "@/components/project/ForgotPasswordDialog";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const App: React.FC = () => {
  const { account } = useAccountStore();
  const { isLoading } = useInitSite();
  const gameTypeList = useGameTypeList();

  if (isLoading) {
    return <Loading show={true} opacity={1} noShrink={true} />;
  }

  return (
    <Router history={AppHistory}>
      <AuthContextProvider>
        <PageNameContextProvider>
          <HeaderContextProvider>
            <PopupContextProvider>
              <AuthDialogContextProvider>
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
                              <AuthGuard route={route}>
                                <LayoutProvider route={route}>
                                  <Suspense
                                    fallback={<Loading show={true} opacity={1} noShrink={true} />}
                                  >
                                    <route.component />
                                  </Suspense>
                                </LayoutProvider>
                              </AuthGuard>
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

                  {config.features.SMSVerification &&
                    account.registercompleted === false &&
                    config.features.ForcedVerification && <ForcedVerification forceVerify={true} />}

                  <PopupAnnouncement />

                  <PopupPromotion />

                  <PopupAlertModal />
                  <FloatingToolIcons />
                  <LoginDialog />
                  <RegisterDialog />
                  <ForgotPasswordDialog />

                  <AuthContextConsumer>
                    {(authState) => <Loading show={authState.isAuthLoading} noShrink={true} />}
                  </AuthContextConsumer>
                </HomeGameContextProvider>
              </AuthDialogContextProvider>
            </PopupContextProvider>
          </HeaderContextProvider>
        </PageNameContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
