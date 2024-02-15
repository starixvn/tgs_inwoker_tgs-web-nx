import { useMemo } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import config, {BrandName, brandConfig} from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { FormInputTypeEnum, UserTypeEnum } from "@tgs-web-nx/core/features";
import { useFormikInitValue } from "./useFormikInitValue";
import { FormikFormInput } from "@/components/project/FormikForm";


type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClickSubmit: (values: any) => Promise<void>;
};

export function useGenerateRegisterCreatePlayerFormik({ handleClickSubmit }: Props) {
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
      (() => {
        //for MOVN2 customization
        if (brandConfig[config.brand as BrandName]?.isRegisterRealNameRequired) {
          return {
            label: i18n.t("common.realName"),
            name: "realName",
            type: FormInputTypeEnum.TEXT,
            initialValue: "",
            validationSchema: Yup.string().required("Realname is required"),
          };
        }
      })(),
      (() => {
        if (!config.features.Register_ShowPhone) return;

        return {
          label: i18n.t("forgotPassword.plsEnterPhoneNumber"),
          name: "phone",
          initialValue: "",
          type: FormInputTypeEnum.PHONE,
          validationSchema: Yup.string()
            .required("Phone is required")
            .matches(new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`), {
              message: i18n
                .t("common.noReachMin")
                .replace(/{maxlength}/g, `${config.features.MAX_PHONE_LENGTH || 10}`),
            }),
        };
      })(),
      (() => {
        if (!config.features.Register_ShowPhone) return;
        return {
          label: "",
          name: "areaCode",
          initialValue: config.features.PhonePrefix,
          type: FormInputTypeEnum.AREA_CODE,
        };
      })(),
      (() => {
        if (!config.features.Register_ShowEmail) return;

        return {
          label: i18n.t("wap.register.email"),
          name: "email",
          initialValue: "",
          type: FormInputTypeEnum.TEXT,
          validationSchema: Yup.string()
            .required("Email is required")
            .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, {
              message: i18n.t("common.msgInvalidEmail"),
            }),
        };
      })(),
      {
        label: i18n.t("wap.register.promoteCode"),
        name: "promoteCode",
        initialValue: "",
        type: FormInputTypeEnum.PROMOTION_CODE,
      },
      {
        label: i18n.t("wap.register.promoteCode"),
        name: "userType",
        initialValue: UserTypeEnum.PLAYER,
        type: FormInputTypeEnum.USER_TYPE,
      },
    ].filter((item) => !!item) as FormikFormInput[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getFormikInitValue } = useFormikInitValue();
  const { initialValues, validationSchemaSpec } = getFormikInitValue(formInputConfigList);

  // ===== formik =====
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: async (values: any) => {
      await handleClickSubmit(values);
    },
  });

  return {
    formInputConfigList,
    formik,
  };
}
