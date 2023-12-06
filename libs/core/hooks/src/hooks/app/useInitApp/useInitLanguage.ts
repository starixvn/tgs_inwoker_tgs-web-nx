import React, { useEffect } from "react";
import { i18n, updateHtmlTitleDescription } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";

export function useInitLanguage() {
  const [isLanguageReady, setIsLanguageReady] = React.useState(false);
  const { getBrandLanguage } = useGeneralStore();

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      updateHtmlTitleDescription();
    });

    i18n.on("loaded", async (options) => {
      await getBrandLanguage();
      setIsLanguageReady(true);
    });
  }, []);

  return {
    isLanguageReady,
  };
}
