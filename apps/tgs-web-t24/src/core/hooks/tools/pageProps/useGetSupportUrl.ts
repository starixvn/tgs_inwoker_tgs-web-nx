import { useCallback } from "react";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { useGeneralStore } from "@/core/stores/useGeneralStore";

export function useGetSupportUrl() {
  const { general } = useGeneralStore();

  const getSupportUrl = useCallback(
    (userid: string, name: string, question: string, email: string) => {
      if (config.features.LiveChatVendor.brand === "zendesk") {
        //@ts-ignore
        window.zE("webWidget", "open");
        return;
      } else if (config.features.LiveChatVendor.brand === "livechat") {
        //@ts-ignore
        window.LiveChatWidget.call("maximize");
        return;
      }

      const newURL = general.livechat
        ? general.livechat.setting.url
            .replace("{name}", name)
            .replace("{lang}", i18n.language)
            .replace("{email}", email || "")
        : "";

      if (!newURL.length) return;
      window.open(newURL, "_blank");
    },
    []
  );

  return {
    getSupportUrl,
  };
}
