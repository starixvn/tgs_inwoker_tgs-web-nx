import React, { useEffect } from "react";
import i18n from "@/utils/i18n";
import Config from "@/config/config";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { updateHtmlTitleDescription } from "@/core/utils/updateHtmlTitleDescription";

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
