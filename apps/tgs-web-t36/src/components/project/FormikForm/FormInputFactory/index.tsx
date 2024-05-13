import { FormInputTypeEnum } from "@tgs-web-nx/core/features";
import FormVerifyCodeWithNewRegisterFlow from "./FormVerifyCodeWithNewRegisterFlow";
import FormText from "@/components/project/FormikForm/FormInputFactory/FormText";
import FormPassword from "@/components/project/FormikForm/FormInputFactory/FormPassword";
import FormPhone from "@/components/project/FormikForm/FormInputFactory/FormPhone";
import FormPromotionCode from "@/components/project/FormikForm/FormInputFactory/FormPromotionCode";
import FormVerifyCode from "@/components/project/FormikForm/FormInputFactory/FormVerifyCode";

export const FormInputFactory = {
  [FormInputTypeEnum.TEXT]: FormText,
  [FormInputTypeEnum.NUMBER]: FormText,
  [FormInputTypeEnum.PASSWORD]: FormPassword,
  [FormInputTypeEnum.PHONE]: FormPhone,
  [FormInputTypeEnum.AREA_CODE]: null,
  [FormInputTypeEnum.PROMOTION_CODE]: FormPromotionCode,
  [FormInputTypeEnum.USER_TYPE]: null,
  [FormInputTypeEnum.VERIFY_CODE]: FormVerifyCode,
  verifyCodeWithNewRegisterFlow: FormVerifyCodeWithNewRegisterFlow,
};
