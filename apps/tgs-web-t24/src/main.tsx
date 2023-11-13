import * as ReactDOM from "react-dom/client";
import "./index.css";
import { applyMiddleware, legacy_createStore as createStore, Store } from "redux";
import thunk from "redux-thunk";
import { StylesProvider } from "@mui/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider as StyleComponentThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import config from "@tgs-web-nx/config";
import { updateHtmlTitleDescription } from "@tgs-web-nx/utils";
import { InterceptorService } from "@tgs-web-nx/core";
import { useInitApp } from "@tgs-web-nx/core/hooks";
import { NotificationContextProvider } from "@tgs-web-nx/core/features";
import { rootReducer } from "@tgs-web-nx/core";
import AudioPlayer from "./components/tools/AudioPlayer";
import FeatureGetter from "./components/tools/FeatureGetter";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import App from "@/App";
import { muiTheme } from "@/theme/mui";
import StyledSnakeBarProvider from "@/components/UI/StyledSnakeBarProvider";
import Loading from "@/components/UI/Loading";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// TODO: hide on production
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) as Store<any>;
InterceptorService.setupInterceptors(store);

window.onload = () => updateHtmlTitleDescription();

const AppWrapper = () => {
  const { isReady } = useInitApp();

  return (
    <NotificationContextProvider>
      <FeatureGetter />
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
