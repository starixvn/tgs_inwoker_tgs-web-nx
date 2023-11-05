import { useNotifications } from "@/core/feature/useNotifications";
import { useNavigation } from "@/core/hooks/tools/pageProps/useNavigation";
import { useCallback } from "react";
import { useUiStore } from "@/core/stores/useUiStore";
import { useGetSupportUrl } from "@/core/hooks/tools/pageProps/useGetSupportUrl";
import { useHistory } from "react-router";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { useLocation } from "react-router";

export function usePageProps() {
  // general
  const { alert } = useNotifications();
  const { navigate } = useNavigation();
  const { getSupportUrl } = useGetSupportUrl();
  const { ui } = useUiStore();
  const history = useHistory();
  const { getBrandCommunication } = useGeneralStore();
  const location = useLocation<{
    ip: string;
    promo: string;
    login: string;
    details: string;
    forget_token: string;
    from: string;
  }>();

  // TODO: complete popup
  const popup = useCallback(() => {
    console.log("this.handleOpenPopup");
  }, []);

  // specific to routePath

  // if (route.path === "/deposit/manual")
  const order = location.state;

  // if (route.path === "/ip-restrict-mobile")
  const ip = location.state?.ip || null;

  // if (route.path === "/promotion/:activityId?")
  const promo = location.state?.promo || null;

  // if (route.path === "/chat/:userid?/:name?/:question?")
  const login = location.state?.login || null;

  // if (route.path === "/forgot-password/option")
  const details = location.state?.details || null;

  // if (route.path === "/forgot-password/reset")
  const forget_token = location.state?.forget_token || null;

  // if (route.path === "/card/name")
  const from = location.state?.from || null;

  return {
    // general
    alert,
    navigate,
    popup,
    screenWidth: ui.screenWidth,
    screenHeight: ui.screenHeight,
    getSupportUrl,
    appHistory: history,
    brandComm: getBrandCommunication,
    // specific to routePath
    ip,
    promo,
    order,
    login,
    details,
    forget_token,
    from,
  };
}
