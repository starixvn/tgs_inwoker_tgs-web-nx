import FormText from "@/components/project/FormikForm/FormInputFactory/FormText";
import FormPassword from "@/components/project/FormikForm/FormInputFactory/FormPassword";
import FormPhone from "@/components/project/FormikForm/FormInputFactory/FormPhone";
import FormPromotionCode from "@/components/project/FormikForm/FormInputFactory/FormPromotionCode";

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
