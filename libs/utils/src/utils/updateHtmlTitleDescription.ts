import config from "@tgs-web-nx/config";
import { i18n } from "../index";

export function updateHtmlTitleDescription() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  if (!title || !description) return;
  title.innerHTML = i18n.t("common.title").replace(/{brand}/g, config.brandTitle);
  description.setAttribute("content", i18n.t("common.title").replace(/{brand}/g, config.brandTitle));
}
