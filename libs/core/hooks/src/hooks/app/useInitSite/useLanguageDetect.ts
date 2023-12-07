import { useEffect } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@tgs-web-nx/core";

export function useLanguageDetect() {
  const {
    general: { brandLanguage },
  } = useGeneralStore();

  const checkIfLanguageIsInBrand = () => {
    if (!brandLanguage.length) return;

    const currentLanguage = i18n.language;

    const isLanguageInBrand = brandLanguage.some((lang) => lang.culturecode === currentLanguage);

    if (isLanguageInBrand) {
      return;
    }

    const newLanguage = brandLanguage[0].culturecode;
    i18n.changeLanguage(newLanguage);

    console.log("checkIfLanguageIsInBrand cause reload");
    window.location.reload();
  };

  // language changed
  useEffect(() => {
    checkIfLanguageIsInBrand();
  }, [JSON.stringify(brandLanguage), i18n]);
}
