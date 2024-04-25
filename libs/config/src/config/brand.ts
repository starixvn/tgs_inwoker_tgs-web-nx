import { GameTypeEnum } from "@tgs-web-nx/constants";

/*
 * 若有新增站台 先在這邊加入對應設定
 * Default BrandName: 'GPI'
 */
type BrandName = "GPI" | "MOVN2" | "MOMOTEST" | "MOPH" | "MOMOVN" | "SBO";

type SocialMediaLink = {
  fb: string;
  ig: string;
  twitter: string;
};

/*
 * MOVN2 客製化設定
 */
type MOVN2Config = {
  isAddRealNameFieldBrand: boolean; // 是否需要新增姓名欄位
  isAutoFillBankHolderName: boolean; // 是否自動帶入姓名
  isDisabledBankHolderName: boolean; // 是否可以編輯姓名
  isRegisterRealNameRequired: boolean; // 註冊是否需要真實姓名
  socialMediaLink: SocialMediaLink; // 社群媒體連結
  isShowLiveChat: boolean; // 是否顯示 livechat
  isShowDownloadApp: boolean; // footer 是否顯示下載 app qrcode
  isShowChatCustomerService: boolean; // footer 是否顯示 Chat Customer Service
  isAllowMulitBankCards: boolean; // 是否可新增多張銀行卡 https://raypro.atlassian.net/browse/TGS-3978
  isDisableWebPinchAction: boolean; // 網站是否禁用縮放
  countryCode: string;
  currencyRate?: number;
  isShowAgentAdminButton: boolean; // 是否將transfer button改成agent amdin button https://raypro.atlassian.net/browse/TGS-4158
  isHideVIPBirthdayBonus: boolean; // 是否在vip 表格隱藏生日福利 https://raypro.atlassian.net/browse/TGS-4324
  isHideVIPQuarterlyBonus: boolean; // 是否在vip 表格隱藏季度福利 https://raypro.atlassian.net/browse/TGS-4324
  isShowVIP: boolean; // 是否在Navigation bar及profile頁面顯示VIP https://raypro.atlassian.net/browse/TGS-4325
  isHideTransferButton: boolean; // 是否在BottomAppBar顯示TransferButton https://raypro.atlassian.net/browse/TGS-4333
  customGametypeSort: string[]; // game type 是否有客製化排序(空陣列代表沒有客製化排序) https://raypro.atlassian.net/browse/TGS-3968
  defaultActiveGametype: GameTypeEnum | null; //預設active的game type https://raypro.atlassian.net/browse/TGS-3968
  customGameProviderSort: string[]; //game provider客製化排序(空陣列代表沒有客製化排序) https://raypro.atlassian.net/browse/TGS-4420
  isInitYuriJs: boolean; // FB推廣碼埋點需求 TGS-4265
  SMSVerifyInRegister: boolean; //是否在註冊時候就進行SMS驗證 https://raypro.atlassian.net/browse/TGS-4417
};

type MOPHConfig = {
  isFixedPhoneLength: boolean;
  contractAge: number; //註冊時,合約文字顯示年齡 https://raypro.atlassian.net/browse/TGS-4435
};

/*
* 新站台 客製化設定
* 建議以 boolean 為主, {key: value} 為輔 例如 socialMediaLink

--- example start ---

type NewBrandConfig = {
  isNewBrand: boolean // 註解寫在這裡
}

--- example end ---
*/

/*
* 將所有客製化設定合併

--- example start ---

type Config = MOVN2Config & NewBrandConfig

--- example end ---
*/

type Config = MOVN2Config & MOPHConfig;

// 預設共用設定
export const defaultConfig: Config = {
  isAddRealNameFieldBrand: false,
  socialMediaLink: {
    fb: "",
    ig: "",
    twitter: "",
  },
  isAutoFillBankHolderName: false,
  isDisabledBankHolderName: false,
  isRegisterRealNameRequired: false,
  isShowLiveChat: true,
  isShowDownloadApp: true,
  isShowChatCustomerService: true,
  isAllowMulitBankCards: true,
  isDisableWebPinchAction: false,
  countryCode: "en-US",
  isShowAgentAdminButton: false,
  isHideVIPBirthdayBonus: false,
  isHideVIPQuarterlyBonus: false,
  isShowVIP: true,
  isHideTransferButton: false,
  customGametypeSort: [],
  defaultActiveGametype: null,
  isFixedPhoneLength: false,
  contractAge: 18,
  customGameProviderSort: [],
  isInitYuriJs: false,
  SMSVerifyInRegister: false,
  // new brand config start here
  // NewBrand
};

// 客製化設定
export const brandConfig: Record<BrandName, Config> = {
  GPI: {
    ...defaultConfig,
    currencyRate: 1000, //for QA testing TGS-4194 & TGS-4184
    isInitYuriJs: true,
  },
  MOVN2: {
    ...defaultConfig,
    isAddRealNameFieldBrand: true,
    socialMediaLink: {
      ...defaultConfig.socialMediaLink,
      fb: "https://www.facebook.com/momobetvn/",
      ig: "https://www.instagram.com/momobet.vn/",
    },
    isAutoFillBankHolderName: true,
    isRegisterRealNameRequired: true,
    isDisabledBankHolderName: true,
    isShowLiveChat: false,
    isShowDownloadApp: false,
    isShowChatCustomerService: false,
    isAllowMulitBankCards: false,
    currencyRate: 1000,
    isDisableWebPinchAction: true,
    isShowAgentAdminButton: true,
    isHideVIPBirthdayBonus: true,
    isHideVIPQuarterlyBonus: true,
    isShowVIP: true,
    isHideTransferButton: true,
    customGametypeSort: [
      "slots",
      "fishing",
      "sports",
      "liveCasino",
      "egame",
      "sabong",
      "cardGame",
      "lottery",
      "esports",
    ],
    defaultActiveGametype: GameTypeEnum.SLOT,
    customGameProviderSort: [
      "JILITF",
      "AWC_PGS",
      "FACHAI",
      "JDBTF",
      "FUNKY",
      "AWC_FS",
      "JOKER",
      "BTG",
      "EVOTF",
      "PPTF",
      "AWC_SG",
      "WMTF",
      "HABATF",
      "RTTF",
      "ENDOR",
      "NLC",
      "AWC_KM",
      "NTTF",
      "AWC_YESBINGO",
      "AWC_BG",
      "DGTF",
      "VR",
      "KY",
      "365TF",
      "OBET",
      "PINNACLE",
      "AWC_VENUS",
      "AWC_YL",
      "TFTF",
    ],
    isInitYuriJs: true,
    SMSVerifyInRegister: true,
  },
  MOMOTEST: {
    ...defaultConfig,
    isAddRealNameFieldBrand: true,
    socialMediaLink: {
      ...defaultConfig.socialMediaLink,
      fb: "https://www.facebook.com/momobetvn/",
      ig: "https://www.instagram.com/momobet.vn/",
    },
    isAutoFillBankHolderName: true,
    isRegisterRealNameRequired: true,
    isDisabledBankHolderName: true,
    isShowLiveChat: false,
    isShowDownloadApp: false,
    isShowChatCustomerService: false,
    isAllowMulitBankCards: false,
    currencyRate: 1000,
    isDisableWebPinchAction: true,
    isShowAgentAdminButton: true,
    isHideVIPBirthdayBonus: true,
    isHideVIPQuarterlyBonus: true,
    isShowVIP: true,
    isHideTransferButton: true,
    isInitYuriJs: true,
    customGametypeSort: [
      "slots",
      "fishing",
      "sports",
      "liveCasino",
      "egame",
      "sabong",
      "cardGame",
      "lottery",
      "esports",
    ],
    defaultActiveGametype: GameTypeEnum.SLOT,
    customGameProviderSort: [
      "JILITF",
      "AWC_PGS",
      "FACHAI",
      "JDBTF",
      "FUNKY",
      "AWC_FS",
      "JOKER",
      "BTG",
      "EVOTF",
      "PPTF",
      "AWC_SG",
      "WMTF",
      "HABATF",
      "RTTF",
      "ENDOR",
      "NLC",
      "AWC_KM",
      "NTTF",
      "AWC_YESBINGO",
      "AWC_BG",
      "DGTF",
      "VR",
      "KY",
      "365TF",
      "OBET",
      "PINNACLE",
      "AWC_VENUS",
      "AWC_YL",
      "TFTF",
    ],
  },
  MOPH: {
    ...defaultConfig,
    socialMediaLink: {
      ...defaultConfig.socialMediaLink,
      fb: "https://www.facebook.com/Momobet.ph",
      ig: "https://www.instagram.com/momobet.ph",
    },
    isInitYuriJs: true,
    isShowAgentAdminButton: true,
    isHideTransferButton: true,
    customGametypeSort: [
      "slots",
      "liveCasino",
      "sports",
      "fishing",
      "egame",
      "cardGame",
      "esports",
      "sabong",
      "lottery",
    ],
    defaultActiveGametype: GameTypeEnum.SLOT,
    customGameProviderSort: [
      "JILITF",
      "AWC_PGS",
      "FACHAI",
      "JDBTF",
      "FUNKY",
      "AWC_FS",
      "JOKER",
      "BTG",
      "EVOTF",
      "PPTF",
      "AWC_SG",
      "WMTF",
      "HABATF",
      "RTTF",
      "ENDOR",
      "NLC",
      "AWC_KM",
      "NTTF",
      "AWC_YESBINGO",
      "AWC_BG",
      "DGTF",
      "VR",
      "KY",
      "365TF",
      "OBET",
      "PINNACLE",
      "AWC_VENUS",
      "AWC_YL",
      "TFTF",
    ],
    contractAge: 21,
    isShowDownloadApp: false,
    SMSVerifyInRegister: true,
  },
  SBO: {
    ...defaultConfig,
    isInitYuriJs: true,
  }
};

export const mapBrandName = (brand: string): BrandName => {
  if (Object.keys(brandConfig).includes(brand)) {
    return brand as BrandName;
  }

  return "GPI";
};
