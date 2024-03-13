/*
 * 若有新增站台 先在這邊加入對應設定
 * Default BrandName: 'GPI'
 */
type BrandName = "GPI" | "MOVN2" | "MOMOTEST" | "MOPH";

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

type Config = MOVN2Config;

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
  // new brand config start here
  // NewBrand
};

// 客製化設定
export const brandConfig: Record<BrandName, Config> = {
  GPI: {
    ...defaultConfig,
    countryCode: "vi-VN", //for QA testing TGS-4194 & TGS-4184
    currencyRate: 1000, //for QA testing TGS-4194 & TGS-4184
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
    countryCode: "vi-VN",
    currencyRate: 1000,
    isDisableWebPinchAction: true,
    isShowAgentAdminButton: true,
    isHideVIPBirthdayBonus: true,
    isHideVIPQuarterlyBonus: true,
  },
  MOPH: {
    ...defaultConfig,
    isShowAgentAdminButton: true,
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
    countryCode: "vi-VN",
    currencyRate: 1000,
    isDisableWebPinchAction: true,
    isShowAgentAdminButton: true,
    isHideVIPBirthdayBonus: true,
    isHideVIPQuarterlyBonus: true,
  },
};

export const mapBrandName = (brand: string): BrandName => {
  if (Object.keys(brandConfig).includes(brand)) {
    return brand as BrandName;
  }

  return "GPI";
};
