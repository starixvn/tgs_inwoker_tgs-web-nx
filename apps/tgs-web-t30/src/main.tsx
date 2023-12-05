import * as ReactDOM from "react-dom/client";
import "./index.css";
import { StylesProvider } from "@mui/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyleComponentThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import config from "@tgs-web-nx/config";
import { updateHtmlTitleDescription } from "@tgs-web-nx/utils";
import { InterceptorService, store } from "@tgs-web-nx/core";
import { useInitApp } from "@tgs-web-nx/core/hooks";
import { NotificationContextProvider } from "@tgs-web-nx/core/features";
import AudioPlayer from "./components/tools/audioplayer";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import App from "@/App";
import { muiTheme } from "@/theme/mui";
import StyledSnakeBarProvider from "@/components/UI/StyledSnakeBarProvider";
import Loading from "@/components/UI/Loading";

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
