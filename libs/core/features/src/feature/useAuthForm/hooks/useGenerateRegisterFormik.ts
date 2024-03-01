import { useMemo } from "react";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { FormInputTypeEnum } from "../types";
import { UserTypeEnum } from "../types";
import { FormikFormInput, useFormikInitValue } from "./useFormikInitValue";
import { usePromotionCode } from "./usePromotionCode";

type Props = {
  handleClickSubmit: (values: FormikValues) => Promise<void>;
};

export function useGenerateRegisterFormik({ handleClickSubmit }: Props) {
  const { promotionData } = usePromotionCode();
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
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
        label: i18n.t("wap.register.confirmPassword"),
        name: "confirmPassword",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string()
          .required()
          //@ts-ignore
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      },

      {
        label: i18n.t("wap.register.promoteCode"),
        name: "promoteCode",
        initialValue: promotionData.upper,
        type: FormInputTypeEnum.PROMOTION_CODE,
      },
      {
        label: i18n.t("wap.register.promoteCode"),
        name: "userType",
        initialValue: UserTypeEnum.AGENT,
        type: FormInputTypeEnum.USER_TYPE,
      },
    ].filter((item) => !!item) as FormikFormInput[];
  }, []);

  const { getFormikInitValue } = useFormikInitValue();
  const { initialValues, validationSchemaSpec } = getFormikInitValue(formInputConfigList);

  // ===== formik =====
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    onSubmit: async (values) => {
      await handleClickSubmit(values);
    },
  });

  return {
    formInputConfigList,
    formik,
  };
}
