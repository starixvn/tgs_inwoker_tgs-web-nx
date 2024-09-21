import { i18n } from "@tgs-web-nx/utils";
import { useFormik } from "formik";
import { useMemo } from "react";
import * as Yup from "yup";

import { usePromotionCodeV2 } from "../../../usePromotionCodeV2";
import { FormInputTypeEnum, InvitationType } from "../../types";
import { FormikFormInput, useFormikInitValue } from "../useFormikInitValue";

type Props = {
  handleClickSubmit: (values: any) => Promise<void>;
};

export function useGenerateRegisterCreatePlayerFormik({ handleClickSubmit }: Props) {
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
          .matches(/^[a-z0-9]{6,16}$/, {
            message: i18n.t("common.msgRegisterUserNameInvalid"),
          }),
      },
      {
        label: i18n.t("common.password"),
        name: "password",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string()
          .required("Password is required")
          .matches(/^.{6,20}$/, {
            message: i18n.t("common.msgRegisterPassInvalid"),
          }),
      },
      {
        label: i18n.t("common.emailAddress"),
        name: "email",
        initialValue: "",
        type: FormInputTypeEnum.TEXT,
        validationSchema: Yup.string()
          .required("Email is required")
          .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
            message: i18n.t("common.msgInvalidEmail"),
          }),
      },

      // (() => {
      //   //for MOVN2 customization
      //   if (config.features.isRegisterRealNameRequired) {
      //     return {
      //       label: i18n.t("common.realName"),
      //       name: "realName",
      //       type: FormInputTypeEnum.TEXT,
      //       initialValue: "",
      //       validationSchema: Yup.string().required("Realname is required"),
      //     };
      //   }
      // })(),
      // // TODO: is following feature toggle still available?
      // (() => {
      //   if (!config.features.Register_ShowPhone) return;

      //   return {
      //     label: i18n.t("forgotPassword.plsEnterPhoneNumber"),
      //     name: "phone",
      //     initialValue: "",
      //     type: FormInputTypeEnum.PHONE,
      //     validationSchema: Yup.string()
      //       .required("Phone is required")
      //       .matches(new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`), {
      //         message: i18n
      //           .t("common.noReachMin")
      //           .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
      //       }),
      //   };
      // })(),
      // (() => {
      //   if (!config.features.Register_ShowPhone) return;
      //   return {
      //     label: "",
      //     name: "areaCode",
      //     initialValue: config.features.PhonePrefix,
      //     type: FormInputTypeEnum.AREA_CODE,
      //   };
      // })(),
      // (() => {
      //   if (!config.features.Register_ShowEmail) return;

      //   return {
      //     label: i18n.t("wap.register.email"),
      //     name: "email",
      //     initialValue: "",
      //     type: FormInputTypeEnum.TEXT,
      //     validationSchema: Yup.string()
      //       .required("Email is required")
      //       .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
      //         message: i18n.t("common.msgInvalidEmail"),
      //       }),
      //   };
      // })(),
      // {
      //   label: i18n.t("wap.register.promoteCode"),
      //   name: "promoteCode",
      //   initialValue: promotionCode,
      //   type: FormInputTypeEnum.PROMOTION_CODE,
      //   isReadOnly: isPromotionCodeReadOnly,
      // },
      // {
      //   label: i18n.t("wap.register.promoteCode"),
      //   name: "userType",
      //   initialValue: invitationType,
      //   type: FormInputTypeEnum.USER_TYPE,
      //   isReadOnly: isPromotionCodeReadOnly,
      // },
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
