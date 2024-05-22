# <DepositForm /> 文件

## 架構

```
├── components
│   ├── Cards.tsx // 存款按鈕
│   ├── DepositAmountInput.tsx // 存款金額輸入
│   ├── DepositFormProvider.tsx // 存款狀態管理
│   ├── DepositPromotion.tsx // 存款活動下拉選單
│   ├── DepositSelectBankName.tsx // 存款 請選擇 電話號碼 / 帳號 選單
│   ├── DepositSubmitButton.tsx // 存款送出表單按鈕
│   ├── Extended // Deposit api 回傳的 channel.extended UI
│   │   ├── BankExtended.tsx // Bank 相關 channel.extended UI
│   │   ├── ExtendedLayout.tsx // 預設 channel.extended UI
│   │   └── index.tsx
│   ├── FormLayout // 存款表單對應 UI
│   │   ├── ALI2ALILayout.tsx 
│   │   ├── BankLayout.tsx
│   │   ├── CoinsphLayout.tsx
│   │   ├── DefaultLayout.tsx // 預設
│   │   ├── EWalletLayout.tsx
│   │   ├── FpsLayout.tsx
│   │   ├── GCashLayout.tsx
│   │   ├── PulsaLayout.tsx
│   │   ├── TrcLayout.tsx
│   │   └── index.tsx
│   ├── Upload.tsx // 上傳檔案
│   ├── index.ts
│   └── styled.tsx 
├── hooks.tsx // DepositForm 共用 hooks
├── index.tsx
├── types.ts // DepositForm 共用 type
└── utils.tsx // DepositForm 共用 utils
```

## Intro

因舊有代碼採用 jsx 且各種 if / else，維護跟開發新功能簡直是不可能的任務，於是直接打掉重練，採用『元件化』的方式提高復用性、且保有可高度客製化的特性，並且努力將每個元件、方法代碼控制在 100 行內，提高可閱讀性，你阿嬤可能都看得懂。

## 新增存款方式

1. 修改現有第一層分類：GroupCodeEnum, useGroupList 目前由前端自定義
2. 修改最後一層分類：無論有幾層，最後一層必為選擇 channel => useChannelList
3. 新增中間層客製化分類：在對應 layout 中做客製化修改，例如銀行存款有客製化的金流商分類，可參考 BankLayout, useProviderList

## 注意事項
1. 部分代碼因原本邏輯幾乎不可考，加上 toggle feature 簡直是五金大賣場，若有遇到類似 config.feature 的判斷只能先採用複製貼上大絕招，待有朝一日能優化得更直觀，若有遇到相關 issue 請先比對 S3 上面的設定檔。
2. 引用 ./components 中的所有元件時，請統一由 ./components 中 import，可以保持其他檔案在 import 時的簡潔（畢竟專案內已經夠多 import ）
3. 其餘若有不懂的部分請找 Sean
