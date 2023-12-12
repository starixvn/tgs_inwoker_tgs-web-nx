import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useNewPasswordStage } from "@tgs-web-nx/core/features";
import FormikForm from "@/components/project/FormikForm";

const NewPasswordStage = () => {
  const { formInputConfigList, formik, isLoading, forgotPasswordError } = useNewPasswordStage();

  return (
    <FormikForm
      formInputList={formInputConfigList}
      formik={formik}
      isLoading={isLoading}
      error={forgotPasswordError}
      buttonText={i18n.t("common.submit")}
    />
  );
};

export default NewPasswordStage;
