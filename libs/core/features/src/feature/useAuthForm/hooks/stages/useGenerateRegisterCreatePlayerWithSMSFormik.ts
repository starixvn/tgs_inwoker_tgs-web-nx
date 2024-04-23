import { useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { i18n } from "@tgs-web-nx/utils";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import { FormInputTypeEnum, InvitationType } from "../../types";
import { FormikFormInput, useFormikInitValue } from "../useFormikInitValue";
import { usePromotionCodeV2 } from "../../../usePromotionCodeV2";

type Props = {
  handleClickSubmit: (values: any) => Promise<void>;
};

export function useGenerateRegisterCreatePlayerWithSMSFormik({ handleClickSubmit }: Props) {
  const { getInvitationType, getPromotionCode } = usePromotionCodeV2();

  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    const invitationType = getInvitationType() || InvitationType.AGENT;
    const promotionCode = getPromotionCode() || "";
    const isPromotionCodeReadOnly = Boolean(invitationType && promotionCode);

    return [
      {
        label: i18n.t("common.username"),
        name: "username",
        initialValue: "",
        type: FormInputTypeEnum.TEXT,
        validationSchema: Yup.string()
          .required("Username is required")
          .matches(/^[a-zA-Z0-9]{6,16}$/, {
            message: i18n.t("common.msgRegisterUserNameInvalid"),
          }),
      },
      {
        label: i18n.t("common.password"),
        name: "pwd",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "12345678",
        validationSchema: Yup.string()
          .required("Password is required")
          .matches(/^.{6,20}$/, {
            message: i18n.t("common.msgRegisterPassInvalid"),
          }),
      },
      {
        label: i18n.t("wap.register.confirmPassword"),
        name: "confirmPassword",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "12345678",
        validationSchema: Yup.string()
          .required()
          //@ts-ignore
          .oneOf([Yup.ref("pwd"), null], "Passwords must match"),
      },
      (() => {
        //for MOVN2 customization
        if (brandConfig[mapBrandName(config.brand)].isRegisterRealNameRequired) {
          return {
            label: i18n.t("common.realName"),
            name: "realName",
            type: FormInputTypeEnum.TEXT,
            initialValue: "",
            validationSchema: Yup.string().required("Realname is required"),
          };
        }
      })(),

      {
        label: i18n.t("wap.register.promoteCode"),
        name: "promoteCode",
        initialValue: promotionCode,
        type: FormInputTypeEnum.PROMOTION_CODE,
        isReadOnly: isPromotionCodeReadOnly,
      },
      {
        label: i18n.t("wap.register.promoteCode"),
        name: "userType",
        initialValue: invitationType,
        type: FormInputTypeEnum.USER_TYPE,
        isReadOnly: isPromotionCodeReadOnly,
      },
      {
        label: i18n.t("forgotPassword.plsEnterPhoneNumber"),
        name: "phone",
        initialValue: "01234567893",
        type: FormInputTypeEnum.PHONE,
        validationSchema: Yup.string()
          .required("Phone is required")
          .matches(new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`), {
            message: i18n
              .t("common.noReachMin")
              .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
          }),
      },
      {
        label: "",
        name: "areaCode",
        initialValue: config.features.PhonePrefix,
        type: FormInputTypeEnum.AREA_CODE,
      },
      {
        label: i18n.t("common.msgEnterCode"),
        name: "verifyCode",
        initialValue: "",
        type: FormInputTypeEnum.VERIFY_CODE,
      },
    ].filter((item) => !!item) as FormikFormInput[];
  }, []);

  const { getFormikInitValue } = useFormikInitValue();
  const { initialValues, validationSchemaSpec } = getFormikInitValue(formInputConfigList);

  // ===== formik =====
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    onSubmit: async (values: any) => {
      await handleClickSubmit(values);
    },
  });

  return {
    formInputConfigList,
    formik,
  };
}
