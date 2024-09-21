import { copyImageToClipboard } from "copy-image-clipboard";

function imagePathGenerator(path: string): string {
  return `${import.meta.env.VITE_ASSETS_PATH}${path}`;
}

export function copy(item: string): void {
  try {
    navigator.clipboard.writeText(item);
  } catch (e: any) {
    console.log(e.message);
  }
}

export function copyImage(image: string): void {
  copyImageToClipboard(image)
    .then(() => {
      console.log("Image Copied");
    })
    .catch((e: Error) => {
      console.log("Error: ", e.message);
    });
}

export function downloadImage(url: string, name: string): void {
  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const imageUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = imageUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(imageUrl);
    })
    .catch((e: Error) => console.log("Error: " + e.message));
}

function removeSpace(str: string): string {
  return str && str.replace(/^\s+|\s+$/g, "");
}

function replaceUnderscoresWithSpace(str: string): string {
  const resultString = str.replace(/_/g, " ");
  return resultString;
}

function getGameUrl(gameProviderCode: string, gameCode: string, isSmallSize?: boolean): string {
  return imagePathGenerator(
    `${gameProviderCode.toLowerCase()}/en-US/${gameCode}${isSmallSize ? "@1x" : "@2x"}.webp`,
  );
}

function copyText(text: string) {
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

export const utility = {
  imagePathGenerator,
  copy,
  copyImage,
  downloadImage,
  removeSpace,
  replaceUnderscoresWithSpace,
  getGameUrl,
  copyText,
};
