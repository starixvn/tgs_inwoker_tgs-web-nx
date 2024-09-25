export function getFavicon() {
  const link: HTMLLinkElement | null =
    document.querySelector("link[rel*='icon']") || document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "icon";
  link.href = `https://app12.srvptt.com/images/favicon/${import.meta.env.VITE_BRAND}.ico`;
}
