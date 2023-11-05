import { LocalizationData } from "@/core/models/dto/general/GetLocalizationResDto";

var translation: LocalizationData | null = null;

const ErrorSwitcher = {
  translation,
  setTranslation: (data: LocalizationData) => {
    translation = data;
  },
  getTranslation: (msgid: string | null): string => {
    if (!msgid) return "";

    return translation && translation[msgid] ? translation[msgid] : msgid;
  },
};
export default ErrorSwitcher;
