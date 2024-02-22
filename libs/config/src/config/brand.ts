/*
* 若有新增站台 先在這邊加入對應設定
* Default BrandName: 'GPI'
*/
export type BrandName = 'GPI' | 'MOVN2'

/*
* MOVN2 客製化設定
*/
type MOVN2Config = {
  isAddRealNameFieldBrand: boolean // 是否需要新增姓名欄位
  hasSocialMediaLink: boolean // 是否有社群媒體連結
  isAutoFillBankHolderName: boolean // 是否自動帶入姓名
  isDisabledBankHolderName: boolean // 是否可以編輯姓名
  isRegisterRealNameRequired: boolean // 註冊是否需要真實姓名
}

/*
* 新站台 客製化設定
* 建議以 boolean 為主

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

type Config = MOVN2Config

// 預設共用設定
const defaultConfig: Config = {
  // MOVN2
  isAddRealNameFieldBrand: false,
  hasSocialMediaLink: false,
  isAutoFillBankHolderName: false,
  isDisabledBankHolderName: false,
  isRegisterRealNameRequired: false,

  // new brand config start here
  // NewBrand
}

// 客製化設定
export const brandConfig: Record<BrandName, Config> = {
  GPI: {
    ...defaultConfig,
  },
  MOVN2: {
    ...defaultConfig,
    isAddRealNameFieldBrand: true,
    hasSocialMediaLink: true,
    isAutoFillBankHolderName: true,
    isRegisterRealNameRequired: true,
    isDisabledBankHolderName: true,
  },
}