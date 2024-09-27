import { useMemo } from "react";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { i18n } from "@tgs-web-nx/utils";
import { FormInputTypeEnum } from "../types";
import { FormikFormInput, useFormikInitValue } from "./useFormikInitValue";

type Props = {
  handleClickSubmit: (values: FormikValues) => Promise<void>;
};

export function useGenerateLoginFormik({ handleClickSubmit }: Props) {
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    const username = localStorage.getItem("username");
    const remember = localStorage.getItem("remember");

    return [
      {
        label: i18n.t("common.username"),
        name: "username",
        initialValue: remember === "true" ? username : "",
        type: FormInputTypeEnum.TEXT,
        validationSchema: Yup.string().required(i18n.t("common.msgUsernameRequired")),
      },
      {
        label: i18n.t("common.password"),
        name: "password",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string().required(i18n.t("common.msgPasswordRequired")),
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
