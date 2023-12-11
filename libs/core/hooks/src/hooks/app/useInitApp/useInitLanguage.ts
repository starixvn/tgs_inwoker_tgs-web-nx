import React, { useEffect } from "react";
import { i18n, updateHtmlTitleDescription } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
const language = localStorage.getItem("i18nextLng");

export function useInitLanguage(isConfigFetched: boolean) {
  const [isLanguageReady, setIsLanguageReady] = React.useState(false);
  const { getBrandLanguage } = useGeneralStore();

  const initI18n = async () => {
    await setDefaultLanguage();
    await fetchSupportLanguageList();
    setIsLanguageReady(true);

    i18n.on("languageChanged", (lng) => {
      updateHtmlTitleDescription();
    });
  };

  useEffect(() => {
    if (!isConfigFetched) return;

    initI18n();
  }, [isConfigFetched]);

  const setDefaultLanguage = async () => {
    const selectedLanguage = language || config.defaultLanguage || "en-US";
    await i18n.changeLanguage(selectedLanguage);
    updateHtmlTitleDescription();
  };

  const fetchSupportLanguageList = async () => {
    await getBrandLanguage();
  };

  return {
    isLanguageReady,
  };
}
