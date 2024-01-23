import { i18n } from "@tgs-web-nx/utils";

const placeholderDictionary: { [key in string]: string } = {
  username: "common.msgEnterUserName",
  password: "common.msgEnterPassword",
  pwd: "common.msgEnterPassword",
  email: "common.emailAddress",
  phone: "common.phoneNumber",
  code: "common.token",
};

export function getPlaceholderWording(name: string) {
  const i18nKey = placeholderDictionary[name];

  return i18n.t(i18nKey) || "";
}
