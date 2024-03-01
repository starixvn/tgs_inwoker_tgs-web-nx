import { useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { i18n } from "@tgs-web-nx/utils";
import { FormInputTypeEnum, UserTypeEnum } from "../../types";
import { FormikFormInput, useFormikInitValue } from "../useFormikInitValue";

type Props = {
  handleClickSubmit: (values: any) => Promise<void>;
};

export function useGenerateRegisterCreatePlayerFormik({ handleClickSubmit }: Props) {
  // console.log("============");
  // console.log(invitationType);
  // console.log(promotionCode);
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    const promotionCode = "123";

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
          .oneOf([Yup.ref("pwd"), null], "Passwords must match"),
      },
      {
        label: i18n.t("wap.register.promoteCode"),
        name: "promoteCode",
        initialValue: promotionCode || "",
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
    onSubmit: async (values: any) => {
      await handleClickSubmit(values);
    },
  });

  return {
    formInputConfigList,
    formik,
  };
}
