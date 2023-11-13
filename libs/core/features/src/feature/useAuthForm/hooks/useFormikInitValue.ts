import { useCallback } from "react";
import { FormikValues } from "formik";
import * as Yup from "yup";
import { FormInputTypeEnum } from "../types";

export interface FormikFormInput {
  type: FormInputTypeEnum;
  label: string;
  name: string;
  initialValue: string;
  validationSchema: Yup.Schema;
}

export function useFormikInitValue() {
  const getFormikInitValue = useCallback((formInputConfigList: FormikFormInput[]) => {
    const initialValues: FormikValues = {};
    const validationSchemaSpec: { [key in string]: any } = {};

    formInputConfigList.forEach((registerInput) => {
      const { name, initialValue, validationSchema } = registerInput;
      initialValues[name] = initialValue;
      validationSchemaSpec[name] = validationSchema;
    });
    return {
      initialValues,
      validationSchemaSpec,
    };
  }, []);

  return { getFormikInitValue };
}
