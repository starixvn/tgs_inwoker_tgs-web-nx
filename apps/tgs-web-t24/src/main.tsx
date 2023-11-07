import * as ReactDOM from "react-dom/client";
import "./index.css";
import { applyMiddleware, legacy_createStore as createStore, Store } from "redux";
import thunk from "redux-thunk";
import InterceptorService from "@/core/services/InterceptorService";
import { StylesProvider } from "@mui/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider as StyleComponentThemeProvider } from "styled-components";
import rootReducer from "@/api-services/reducers/rootReducer";
import App from "@/App";
import { NotificationContextProvider } from "@/core/feature/useNotifications/contexts/notificationContext";
import AudioPlayer from "./components/tools/AudioPlayer";
import FeatureGetter from "./components/tools/FeatureGetter";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { muiTheme } from "@/theme/mui";
import Config from "@/config/config";
import StyledSnakeBarProvider from "@/components/UI/StyledSnakeBarProvider";
import Loading from "@/components/UI/Loading";
import { useInitApp } from "@/core/hooks/app/useInitApp";
import { updateHtmlTitleDescription } from "@/core/utils/updateHtmlTitleDescription";
import { Provider } from "react-redux";

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
      {Config.features.BackgroundMusic && <AudioPlayer />}

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
