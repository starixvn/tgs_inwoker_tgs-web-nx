// @ts-nocheck
import { useCallback, useState } from "react";
import { utility } from "@tgs-web-nx/utils";

export enum ImageActionEnum {
  "COPY",
  "DOWNLOAD",
}

export function useImageActions() {
  const imageId = "qrcode-container";
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleQrAction = useCallback(
    (option: ImageActionEnum) => {
      // debounce
      if (option === ImageActionEnum.COPY && isCopied) return;
      if (option === ImageActionEnum.DOWNLOAD && isDownloaded) return;

      const svgElement = document.querySelector(`#${imageId}`).firstElementChild;
      if (!svgElement) return;

      const { width, height } = svgElement.getBBox();
      const clonedSvgElement = svgElement.cloneNode(true);
      const outerHTML = clonedSvgElement.outerHTML,
        blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(blob);

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        const context = canvas.getContext("2d");
        const offsetPositionX = (canvas.width - width) / 2;
        const offsetPositionY = (canvas.height - height) / 2;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, offsetPositionX, offsetPositionY, width, height);
        const png = canvas.toDataURL();

        if (option === "copy") {
        } else if (option === "download") {
        }

        switch (option) {
          case ImageActionEnum.COPY:
            setIsCopied(true);
            utility.copyImage(png);

            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
            break;

          case ImageActionEnum.DOWNLOAD:
            setIsDownloaded(true);
            utility.downloadImage(png, "download.png");

            setTimeout(() => {
              setIsDownloaded(false);
            }, 3000);
            break;

          default:
        }
      };

      image.src = blobURL;
    },
    [isCopied, isDownloaded],
  );

  return {
    imageId,
    handleQrAction,
    isCopied,
    isDownloaded,
  };
}
