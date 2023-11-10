import React, { Suspense } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ForcedVerification from "./components/project/ForcedVerification";
import LiveChat from "./components/tools/LiveChat";
import { AppHistory } from "@/history/History";
import config from "@tgs-web-nx/config";
import { routes } from "@/router";
import PopupAlertModal from "@/components/project/Popup/PopupAlertDialog";
import PopupAnnouncement from "@/components/project/Popup/PopupAnnouncement";
import PopupPromotion from "@/components/project/Popup/PopupPromotion";
import {
  AuthContextConsumer,
  AuthContextProvider,
} from "@/core/feature/useAuth/contexts/authContext";
import LayoutProvider from "@/layouts/LayoutProvider";
import { AuthGuard } from "@/core/components/authentication/AuthGuard";
import FloatingToolIcons from "@/components/project/FloatingToolIcons";
import { PageNameContextProvider } from "@/core/feature/usePageName/contexts/pageNameContext";
import Loading from "@/components/UI/Loading";
import ScrollToTop from "@/core/utils/ScrollToTop";
import LoginDialog from "@/components/project/LoginDialog";
import RegisterDialog from "@/components/project/RegisterDialog";
import { HeaderContextProvider } from "@/core/feature/useHeader/contexts/headerContext";
import { AuthDialogContextProvider } from "@/core/feature/useAuthDialog/contexts/authDialogContext";
import ForgotPasswordDialog from "@/components/project/ForgotPasswordDialog";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { useInitSite } from "@/core/hooks/app/useInitSite";
import { PopupContextProvider } from "@/core/feature/usePopup/contexts/popupContext";
import { HomeGameContextProvider } from "@/core/feature/game/contexts/homeGameContext";

const App: React.FC = () => {
  const { account } = useAccountStore();
  const { isLoading } = useInitSite();

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
                <HomeGameContextProvider>
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
