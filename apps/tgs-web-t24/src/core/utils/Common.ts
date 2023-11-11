import { i18n } from "@tgs-web-nx/utils";

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
  newWindow = window.open(
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

  if (!newWindow || newWindow.closed || typeof newWindow.closed == "undefined") {
    // POPUP BLOCKED
  } else {
    // Puts focus on the newWindow
    if (window.document.hasFocus()) newWindow.focus();
    popup[title] = newWindow;
    return newWindow;
  }
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

function formatNumberWithThousand(x: number): string {
  if (isNaN(x)) return x.toString();
  return x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
};

export default Common;
