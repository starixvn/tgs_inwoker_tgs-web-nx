import { i18n } from "../index";

export function updateHtmlTitleDescription() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  if (!title || !description) return;
  title.innerHTML = i18n.t("common.title").replace(/{brand}/g, import.meta.env.VITE_BRAND_TITLE);
  description.setAttribute("content", i18n.t("common.title").replace(/{brand}/g, import.meta.env.VITE_BRAND_TITLE));
}
