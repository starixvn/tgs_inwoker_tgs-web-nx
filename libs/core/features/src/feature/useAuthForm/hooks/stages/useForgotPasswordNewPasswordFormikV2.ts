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

export function useForgotPasswordNewPasswordFormikV2({ handleClickSubmit }: Props) {
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    return [
      {
        label: i18n.t("forgotPassword.plsEnterPhoneNumber"),
        name: "phone",
        initialValue: "",
        type: FormInputTypeEnum.PHONE,
        validationSchema: Yup.string(),
      },
      {
        label: i18n.t("common.msgEnterCode"),
        name: "verifyCode",
        initialValue: "",
        type:FormInputTypeEnum.VERIFY_CODE,
        validationSchema: Yup.string().required("validation code is required"),
      },
      {
        label: "",
        name: "areaCode",
        initialValue: config.features.PhonePrefix,
        type: FormInputTypeEnum.AREA_CODE,
      },
      {
        label: i18n.t("common.msgEnterNewPass"),
        name: "pwd",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string()
          .required(i18n.t("common.msgPasswordRequired"))
          .matches(/^.{6,20}$/, {
            message: i18n.t("common.msgRegisterPassInvalid"),
          }),
      },
      {
        label: i18n.t("common.ConfirmPass"),
        name: "confirmPwd",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string()
          .required(i18n.t("common.msgConfirmPasswordRequired"))
          //@ts-ignore
          .oneOf([Yup.ref("pwd"), null], i18n.t("common.msgInvalidConfirmPass")),
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
