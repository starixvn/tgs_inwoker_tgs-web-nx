import i18n from "@/utils/i18n";
import Config from "@/config/config";

export function updateHtmlTitleDescription() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  if (!title || !description) return;
  title.innerHTML = i18n.t("common.title").replace(/{brand}/g, Config.brandName);
  description.setAttribute("content", i18n.t("common.title").replace(/{brand}/g, Config.brandName));
}
