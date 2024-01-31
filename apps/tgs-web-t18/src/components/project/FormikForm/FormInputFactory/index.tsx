import FormPassword from "./FormPassword";
import FormPhone from "./FormPhone";
import FormPromotionCode from "./FormPromotionCode";
import FormText from "./FormText";

export enum FormInputTypeEnum {
  "TEXT",
  "PASSWORD",
  "NUMBER",
  "PHONE",
  "AREA_CODE",
  "PROMOTION_CODE",
  "USER_TYPE",
}

export const FormInputFactory = {
  [FormInputTypeEnum.TEXT]: FormText,
  [FormInputTypeEnum.NUMBER]: FormText,
  [FormInputTypeEnum.PASSWORD]: FormPassword,
  [FormInputTypeEnum.PHONE]: FormPhone,
  [FormInputTypeEnum.AREA_CODE]: null,
  [FormInputTypeEnum.PROMOTION_CODE]: FormPromotionCode,
  [FormInputTypeEnum.USER_TYPE]: null,
};
