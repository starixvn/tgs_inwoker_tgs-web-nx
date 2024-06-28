import enUS from "libs/core/static/images/language/en-US.webp";
import zhTW from "libs/core/static/images/language/zh-TW.webp";
import zhCN from "libs/core/static/images/language/zh-CN.webp";
import thTH from "libs/core/static/images/language/th-TH.webp";
import viVN from "libs/core/static/images/language/vi-VN.webp";
import idID from "libs/core/static/images/language/id-ID.webp";
import tglPH from "libs/core/static/images/language/tgl-PH.webp";
import hiIN from "libs/core/static/images/language/hi-IN.webp";
import taIN from "libs/core/static/images/language/ta-IN.webp";
import jaJp from "libs/core/static/images/language/ja-JP.webp";

export function useGetCountryFlagImg(culturecode: string) {
  const imageMap: Record<string, string> = {
    "en-US": enUS,
    "zh-TW": zhTW,
    "zh-CN": zhCN,
    "th-TH": thTH,
    "vi-VN": viVN,
    "id-ID": idID,
    "tgl-PH": tglPH,
    "hi-IN": hiIN,
    "ta-IN": taIN,
    "ja-JP": jaJp,
  };
  return imageMap[culturecode];
}
