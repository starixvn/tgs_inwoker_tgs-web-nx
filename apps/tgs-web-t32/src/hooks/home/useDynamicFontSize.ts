import { useEffect, useRef } from "react";
import { utility } from "@tgs-web-nx/utils";

const exceptionName = (text: string | null) => {
  switch (text) {
    case "JUNGLEJUNGLE":
      return (text = "JUNGLE\nJUNGLE");
    case "PRAGMATICPLAY":
      return (text = "PRAGMATIC\nPLAY");
    default:
      return text;
  }
};

const adjustFontSize = (container: HTMLElement, text: HTMLElement) => {
  if (container && text) {
    // Replace underscores with spaces
    if (text.textContent) {
      text.textContent = utility.replaceUnderscoresWithSpace(text.textContent);
      text.textContent = exceptionName(text.textContent);
    }

    // Use requestAnimationFrame to wait for the next frame
    requestAnimationFrame(() => {
      const containerWidth = container.clientWidth;
      const textWidth = text.scrollWidth;

      const computedStyles = window.getComputedStyle(text);
      const fontSize = parseFloat(computedStyles.fontSize);

      if (textWidth > containerWidth) {
        const newFontSize = fontSize * (containerWidth / textWidth) * 0.9;
        text.style.fontSize = `${newFontSize}px`;
        text.style.fontWeight = "650";
      }
    });
  }
};

const resizeText = ({ container, text }: { container: HTMLElement; text: HTMLElement }) => {
  adjustFontSize(container, text);
};

const useDynamicFontSize = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      adjustFontSize(containerRef.current, textRef.current);
    }

    const handleResize = () => {
      if (containerRef.current && textRef.current) {
        adjustFontSize(containerRef.current, textRef.current);
      }
    };

    window.addEventListener("reFontSize", handleResize);
    return () => {
      window.removeEventListener("reFontSize", handleResize);
    };
  }, []);

  return { containerRef, textRef, resizeText };
};

export default useDynamicFontSize;
