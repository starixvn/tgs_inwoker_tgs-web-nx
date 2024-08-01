import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import { i18n } from "../index";
let newWindow: Window | undefined;

function getCDNLanguagePrefix(): string {
  let prefix = "en-US";
  const arr = [
    { lang: ["zh-CN", "zh-TW"], prefix: "zh-CN" },
    { lang: ["en-US"], prefix: "en-US" },
  ];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].lang.indexOf(i18n.language) >= 0) {
      prefix = arr[i].prefix;
      break;
    }
  }

  return prefix;
}

function readFileDataAsBinary(e: { files: FileList }): Promise<ArrayBuffer> {
  const file = e.files[0];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result as ArrayBuffer);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsArrayBuffer(file);
  });
}

const popup: { [key: string]: Window } = {};

function PopupCenter(url: string, title: string, w = 0, h = 0): Window | undefined {
  if (popup[title]) {
    if (!popup[title].closed) {
      popup[title].focus();
      return;
    }
  }

  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;

  const systemZoom = 1;
  let left = (width - w) / 2 / systemZoom + dualScreenLeft;
  let top = (height - h) / 2 / systemZoom + dualScreenTop;
  top = top < 0 ? 0 : top;
  left = left < 0 ? 0 : left;
  // closePreviousPopup();
  //@ts-ignore

  window.open(
    url,
    "gamewindow",
    "scrollbars=yes, width=" +
      w / systemZoom +
      ", height=" +
      h / systemZoom +
      ", top=" +
      top +
      ", left=" +
      left,
  );

  // if (!newWindow || newWindow.closed || typeof newWindow.closed == "undefined") {
  //   // POPUP BLOCKED
  // } else {
  //   // Puts focus on the newWindow
  //   if (window.document.hasFocus()) newWindow.focus();
  //   popup[title] = newWindow;
  //   return newWindow;
  // }
}

function closePreviousPopup() {
  if (newWindow !== undefined) newWindow.close();
}
function formatNumberWithCommas(x: number | string): string {
  if (typeof x === "number") return x.toString();

  return parseFloat(x)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function formatNumberWithThousand(x: number, decimal = 2): string {
  if (isNaN(x)) return x.toString();
  return x.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function formatNumberWithCommasNoRounding(x: number | string): string {
  if (typeof x === "number") return x.toString();

  return parseFloat(x)
    .toFixed(6)
    .slice(0, -4)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function arrayValidator(array: any[]): boolean {
  return array && Array.isArray(array) && array.length > 0;
}

function truncateString(str: string, n: number): string {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

/**
 * 檢查存提款輸入欄位
 * 1. 只能輸入純數字
 * 2. 須在區間內
 * @param input 輸入內容
 * @param maxAmount 最大金額
 * @param minAmount 最小金額
 * @returns isDisabled
 */
const validateDepositAndWithdrawAmount = (
  input: string,
  maxAmount: number,
  minAmount: number,
): boolean => {
  const regex = /^(?!0)[0-9]+$/;
  const isValid = regex.test(input) && Number(input) <= maxAmount && Number(input) >= minAmount;
  return !isValid;
};

/**
 * 取得貨幣格式
 * @param amount 金額
 * @param countryCode 國碼
 * @returns 貨幣格式
 */
const formatCurrency = (amount?: number) => {
  if(amount === undefined) return "";
  
  return new Intl.NumberFormat(brandConfig[mapBrandName(config.brand)].countryCode).format(amount);
};

/**
 * 判斷當前瀏覽器是否為 webview
 * @notice useragent 會有被改的風險 但是機率不高
 */
function isWebview() {
  const useragent = navigator.userAgent;
  const rules = ["WebView", "(iPhone|iPod|iPad)(?!.*Safari/)", "Android.*(wv|.0.0.0)"];
  const regex = new RegExp(`(${rules.join("|")})`, "ig");
  return Boolean(useragent.match(regex));
}


/**
 * 格式化金額無條件進位至小數第二位
 */
function roundUpToTwoDecimals(amount: number) {
  //無條件進位到小數點後兩位
  let rounded = Math.ceil(amount * 100) / 100;
  return formatNumberWithCommas(
    // 如果數字是整數，返回整數部分，否則返回保留兩位小數的字符串
    rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2).replace(/\.?0+$/, ""),
  );
}

const Common = {
  formatNumberWithCommas,
  formatNumberWithThousand,
  formatNumberWithCommasNoRounding,
  PopupCenter,
  closePreviousPopup,
  readFileDataAsBinary,
  getCDNLanguagePrefix,
  arrayValidator,
  truncateString,
  validateDepositAndWithdrawAmount,
  formatCurrency,
  isWebview,
  roundUpToTwoDecimals,
};

export default Common;
