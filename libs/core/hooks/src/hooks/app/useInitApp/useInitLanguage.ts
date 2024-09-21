import { useEffect, useState } from "react";
import { i18n, updateHtmlTitleDescription } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { BrandLanguage } from "@tgs-web-nx/types";
import { useGeneralStore } from "@tgs-web-nx/core";

const language: string | null = localStorage.getItem("i18nextLng");

export function useInitLanguage() {
  const [isLanguageReady, setIsLanguageReady] = useState(false);
  const { getBrandLanguage } = useGeneralStore();

  //todo
  // useEffect(() => {
  //    if (!isConfigFetched) return;

  //   initI18n();
  // }, [isConfigFetched]);

  useEffect(() => {
    initI18n();
  }, [])

  const initI18n = async () => {
    const brandLanguageList = await getSupportLanguageList();
    await setDefaultLanguage(brandLanguageList);
    updateHtmlTitleDescription();

    setIsLanguageReady(true);

    i18n.on("languageChanged", (lng) => {
      updateHtmlTitleDescription();
    });
  };

  const getSupportLanguageList = async (): Promise<BrandLanguage[]> => {
    const res = await getBrandLanguage();
    if (res?.IsSuccess) {
      return res.data;
    }
    return [];
  };

  return {
    isLanguageReady,
  };
}

async function setDefaultLanguage(brandLanguageList: BrandLanguage[]) {
  const selectedLanguage =
    language && checkIfLanguageValid(language, brandLanguageList)
      ? language
      : getDefaultLanguage(brandLanguageList);
  await i18n.changeLanguage(selectedLanguage);
}

function getDefaultLanguage(brandLanguageList: BrandLanguage[]) {
  if (checkIfLanguageValid(import.meta.env.VITE_DEFAULT_LANGUAGE, brandLanguageList)) {
    return import.meta.env.VITE_DEFAULT_LANGUAGE;
  }

  return "en-US" || brandLanguageList[0].culturecode;
}

function checkIfLanguageValid(language: string | null, brandLanguageList: BrandLanguage[]) {
  if (!language) return false;

  const stringList = brandLanguageList.map((brandLanguage) => brandLanguage.culturecode);
  return stringList.includes(language);
}
