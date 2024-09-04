import "./sentry";
import "@/assets/styles/embla.css";
import "@/assets/styles/index.css";

import App from "@/App";
import Loading from "@/components/UI/Loading";
import StyledSnakeBarProvider from "@/components/UI/StyledSnakeBarProvider";
import { muiTheme } from "@/theme/mui";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import config from "@tgs-web-nx/config";
import { InterceptorService, store } from "@tgs-web-nx/core";
import { NotificationContextProvider } from "@tgs-web-nx/core/features";
import { useInitApp } from "@tgs-web-nx/core/hooks";
import { updateHtmlTitleDescription } from "@tgs-web-nx/utils";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider as StyleComponentThemeProvider } from "styled-components";

import AudioPlayer from "./components/tools/NativeAudioPlayer";
import { GlobalStyles } from "./global";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

InterceptorService.setupInterceptors(store);

window.onload = () => updateHtmlTitleDescription();

const AppWrapper = () => {
  const { isReady } = useInitApp();

  return (
    <NotificationContextProvider>
      {config.features.BackgroundMusic && <AudioPlayer />}

      <StylesProvider injectFirst>
        <MuiThemeProvider theme={muiTheme as any}>
          <StyleComponentThemeProvider theme={theme}>
            <GlobalStyles />
            <StyledSnakeBarProvider>
              {isReady ? <App /> : <Loading show={true} opacity={1} noShrink={true} />}
            </StyledSnakeBarProvider>
          </StyleComponentThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </NotificationContextProvider>
  );
};

root.render(
  // <StrictMode>
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
  // </StrictMode>
);
