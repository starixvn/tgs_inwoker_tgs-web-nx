import { useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { RegisterV2CreatePlayerReqDto } from "@tgs-web-nx/types";
import { FormInputTypeEnum, InvitationType } from "../../types";
import { FormikFormInput, useFormikInitValue } from "../useFormikInitValue";

type Props = {
  handleClickSubmit: (values: any) => Promise<void>;
};

export function useForgotPasswordNewPasswordFormik({ handleClickSubmit }: Props) {
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    return [
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
        name: "confirmPwd",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string()
          .required()
          //@ts-ignore
          .oneOf([Yup.ref("pwd"), null], "Passwords must match"),
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
