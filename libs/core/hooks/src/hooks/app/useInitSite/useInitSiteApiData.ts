import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import config from "@tgs-web-nx/config";
import { BlowFishEncryption, ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import {
  GeneralService,
  useAccountStore,
  useGameStore,
  useGeneralStore,
  useInboxStore,
  useUiStore,
  useWalletStore,
} from "@tgs-web-nx/core";

export function useInitSiteApiData() {
  const {
    general,
    getSiteToken,
    getBanner,
    getBrand,
    getBrandCommunication,
    getLiveChatURL,
    getPromotion,
    getAffiliateStatus,
    getPromotionRouletteCount,
  } = useGeneralStore();
  const {
    getDepositMethod,
    getWithdrawalChannel,
    getBalanceList,
    getBankCardList,
    getAutoTransferStatus,
  } = useWalletStore();
  const { account, checkTokenIsValid, getAccountProfile } = useAccountStore();
  const { getMarquee, getAnnouncement } = useUiStore();
  const { getMessages } = useInboxStore();
  const { getProviderList } = useGameStore();
  const history = useHistory();

  const [isInitSiteLoading, setIsInitSiteLoading] = useState(true);

  useEffect(() => {
    init();
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const init = async () => {
    // Common.loadScript("/js/config.js", () => {
    //   Common.loadScript("/js/iovation.js", () => {});
    // });

    saveUrlInfoToLocalStorage();
    await handleSiteDataFetching();
    handleGoto();
    handleTo();
    await handleAccountInfoFetching();
    setIsInitSiteLoading(false);
  };

  const saveUrlInfoToLocalStorage = () => {
    const urlPath = window.location.pathname.split("/");

    if (urlPath.length !== 3) {
      localStorage.setItem("invitationtype", "");
      localStorage.setItem("upper", "");
      localStorage.setItem("promotionId", "");
      return;
    }

    if (urlPath[1] === "a") {
      localStorage.setItem("promotionId", urlPath[2] || "");
      localStorage.setItem("upper", "");
      localStorage.setItem("invitationtype", "a");
    }

    if (urlPath[1] === "p") {
      localStorage.setItem("upper", urlPath[2] || "");
      localStorage.setItem("promotionId", "");
      localStorage.setItem("invitationtype", "p");
    }
  };

  const handleSiteDataFetching = async () => {
    if (!general.token) {
      await getSiteToken();
      return;
    }

    getMarquee(i18n.language);
    getAnnouncement(i18n.language);
    getBanner();
    getBrand();
    getBrandCommunication();
    getLiveChatURL();
    getPromotion();
    getAffiliateStatus();

    // TODO: these fetch method can move to single page
    // getWithdrawalChannel();
  };

  const handleGoto = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("goto")) return;

    const gotoValue = urlParams.get("goto");
    if (gotoValue) {
      window.location.href = gotoValue;
    }
  };

  const handleTo = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("do")) return;

    const doValue = urlParams.get("do");
    switch (doValue) {
      case "login":
      case "logout":
      case "register":
      case "login_auth":
      case "register_auth":
        localStorage.removeItem("token0");
        localStorage.removeItem("token1");
        break;

      case "login_token":
        //@ts-ignore
        const decryptedToken: string | null = BlowFishEncryption.Decrypt(urlParams.get("token"));

        if (!decryptedToken) break;
        localStorage.setItem("token0", decryptedToken);
        localStorage.setItem("token1", decryptedToken);
        history.replace("/");
        break;

      default:
        return "";
    }
  };

  const handleAccountInfoFetching = async () => {
    const localStorageToken = localStorage.getItem("token1") || localStorage.getItem("token0");

    const isNeedToRestoreAccountData = !!localStorageToken;
    if (!isNeedToRestoreAccountData) return;

    const getMemberInfoRes = await getAccountProfile(true);
    if (!getMemberInfoRes) return;
    const bankInfoAuthentication = getMemberInfoRes.data.bankinfoauthentication;
    const isPhoneNull = !getMemberInfoRes.data.phone;
    const isEmailNull = !getMemberInfoRes.data.email;
    const isRegisterCompleted = getMemberInfoRes?.data.registercompleted;

    if (config.features.ForceRedirectAddCard && !bankInfoAuthentication) {
      setIsInitSiteLoading(false);
      if (isPhoneNull) {
        history.push({
          pathname: "/profile/phone",
          state: { forced: true },
        });
      }

      if (isEmailNull) {
        history.push({
          pathname: "/profile/email",
          state: { forced: true },
        });
      }

      if (!isRegisterCompleted) {
        history.push("/card/add");
      }

      return;
    }

    getBalanceList();
    getMessages(i18n.language, 1, 99);
    getPromotionRouletteCount();

    //NOTE: no need to fetch these api in here
    // handleUpdateProviderBalance();
    // getAutoTransferStatus();
    // getWithdrawalChannel();
  };

  const onFocus = () => {
    if (!account.token) return;

    getBalanceList();
  };

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      handleLoginTokenChanged();
    } else {
      isMounted.current = true;
    }
  }, [general.token]);

  const handleLoginTokenChanged = async () => {
    if (!general.token) {
      getSiteToken();
      getPromotion();
      return;
    }

    localStorage.setItem("client-token", general.token);

    GeneralService.GetLocalization().then((response) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });

    getProviderList();
    getMarquee(i18n.language);
    getAnnouncement(i18n.language);
    getBanner();
    getBrand();
    getBrandCommunication();
    getLiveChatURL();
    getPromotion();
    getAffiliateStatus();
  };

  return {
    isInitSiteLoading,
  };
}
