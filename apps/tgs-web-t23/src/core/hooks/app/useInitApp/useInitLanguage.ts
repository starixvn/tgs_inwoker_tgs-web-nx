import React, { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { updateHtmlTitleDescription } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@/core/stores/useGeneralStore";

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
