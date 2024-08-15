import { useHistory } from "react-router-dom";
import { useCallback, useMemo } from "react";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { useAccountStore, useGeneralStore } from "@tgs-web-nx/core";
import { AccountInfo } from "@tgs-web-nx/types";

export interface ProfileItem {
  key: string;
  label: string;
  isVerified?: boolean;
  status: string;
  routePath: string;
  buttonText: string;
}

enum CustomMessagingEnum {
  FacebookMessenger = "fb",
  Line = "line",
  Telegram = "telegram",
  WhatsApp = "whatsapp",
  Wechat = "wechat",
  Viber = "viber",
  Qq = "qq",
  Zalo = "zalo",
}

export function useProfileMenu() {
  const { account } = useAccountStore();
  const { general } = useGeneralStore();
  const history = useHistory();

  const getStatus = useCallback(() => {
    const currentFormStatus = account.info.identityformstatus;
    const hasSubmitted = !!account.info.identityformid;

    let status = "";

    if (currentFormStatus === 0 && !hasSubmitted) {
      //api沒給表單id ，表示可以上傳
      return (status = "no");
    }
    if ((currentFormStatus === 1 && hasSubmitted) || currentFormStatus === 1) {
      return (status = "yes");
    }
    if ((currentFormStatus === 2 && hasSubmitted) || currentFormStatus === 2) {
      //有給表單id但是狀態是拒絕，也可以上傳
      return (status = "rejected");
    }
    if (currentFormStatus === 0 && hasSubmitted) {
      //有給表單id但狀態沒驗證，不能上傳
      return (status = "verifying");
    }
    return status;
  }, [account]);

  const profileItemDictionary = useMemo<{
    [key in string]: ProfileItem;
  }>(() => {
    return {
      name: {
        key: "name",
        label: i18n.t("common.realName"),
        isVerified: !!account.info.member_name,
        status: account.info.member_name
          ? i18n.t(
              `${account.info.member_name} ${
                config.features.ShowVerificationStatus
                  ? `(` + i18n.t("verified." + getStatus()) + `)`
                  : ""
              }`,
            )
          : i18n.t("profile.notSet"),
        routePath: "/profile/name",
        buttonText: account.info.member_name
          ? i18n.t("profile.details")
          : i18n.t("profile.nowVerify"),
      },
      phone: {
        key: "phone",
        label: i18n.t("profile.phone.title"),
        isVerified: !!account.info.member_phone,
        status: account.info.member_phone
          ? account.info.member_phone.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/phone",
        buttonText: account.info.member_phone
          ? i18n.t("profile.details")
          : i18n.t("profile.nowVerify"),
      },
      email: {
        key: "email",
        label: i18n.t("common.emailAddress"),
        isVerified: !!account.info.member_email,
        status: account.info.member_email ? account.info.member_email : i18n.t("profile.notSet"),
        routePath: "/profile/email",
        buttonText: account.info.member_email
          ? i18n.t("profile.details")
          : i18n.t("profile.nowVerify"),
      },
      birth: {
        key: "birthdate",
        label: i18n.t("profile.birthdate.title"),
        isVerified: !!account.info.member_birthdate,
        status: account.info.member_birthdate
          ? account.info.member_birthdate
          : i18n.t("profile.notSet"),
        routePath: "/profile/birthdate",
        buttonText: account.info.member_birthdate
          ? i18n.t("profile.details")
          : i18n.t("profile.setNow"),
      },
      qq: {
        key: "qq",
        label: i18n.t("common.qqNumber"),
        isVerified: !!account.info.member_qq,
        status: account.info.member_qq
          ? account.info.member_qq.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/qq",
        buttonText: account.info.member_qq ? i18n.t("profile.details") : i18n.t("profile.setNow"),
      },
      wechat: {
        key: "wechat",
        label: i18n.t("common.wechatNumber"),
        isVerified: !!account.info.member_wechat,
        status: account.info.member_wechat
          ? account.info.member_wechat.substring(0, 1) + "**"
          : i18n.t("profile.notSet"),
        routePath: "/profile/wechat",
        buttonText: account.info.member_wechat
          ? i18n.t("profile.details")
          : i18n.t("profile.setNow"),
      },
      password: {
        key: "changepassword",
        label: i18n.t("profile.password.title"),
        status: "",
        routePath: "/profile/changepassword",
        buttonText: i18n.t("profile.edit"),
      },
    };
  }, []);

  const customMessagingList = useMemo(() => {
    return general.customMessagingList.map((platform) => {
      const name = CustomMessagingEnum[platform.name as keyof typeof CustomMessagingEnum];
      const key = `member_${name}` as keyof AccountInfo;
      const value = account.info[key];
      const status =
        typeof value === "string" ? value.substring(0, 1) + "**" : i18n.t("profile.notSet");
      return {
        key: name,
        label: i18n.t("common." + name),
        isVerified: !!account.info[key],
        status: status,
        routePath: `/profile/${name}`,
        buttonText: account.info[key] ? i18n.t("profile.details") : i18n.t("profile.setNow"),
      };
    });
  }, [account]);

  const handleClickProfileItem = useCallback((newProfileItem: ProfileItem) => {
    history.push(newProfileItem.routePath);
  }, []);

  return {
    profileItemDictionary,
    customMessagingList,
    handleClickProfileItem,
  };
}
