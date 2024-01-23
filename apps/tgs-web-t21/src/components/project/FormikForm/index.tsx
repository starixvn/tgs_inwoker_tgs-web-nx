import React from "react";
import * as Yup from "yup";
import styled from "styled-components";
import { FormInputTypeEnum } from "@tgs-web-nx/core/features";
import { FormInputFactory } from "@/components/project/FormikForm/FormInputFactory";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import FormLabel from "@/components/project/FormikForm/FormLabel";

const ErrorMessageContainer = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-shrink: 0;
`;

const FormInputGroup = styled.div``;

export interface FormikFormInput {
  type: FormInputTypeEnum;
  label: string;
  name: string;
  initialValue: string;
  validationSchema: Yup.Schema;
}

type Props = {
  formInputList: FormikFormInput[];
  formik: any;
  isLoading: boolean;
  error: Error | null;
  buttonText: string;
  children?: React.ReactNode;
  showErrorOn?: "bottom" | "input";
};

const FormikForm = ({
  formik,
  formInputList,
  isLoading,
  error,
  buttonText,
  children,
  showErrorOn = "bottom",
}: Props) => {
  const getBottomErrorMessage = () => {
    if (showErrorOn !== "bottom") return "";

    let errorMsg = "";
    for (const formInput of formInputList) {
      if (!(formik.touched[formInput.name] && formik.errors[formInput.name])) continue;

      errorMsg = formik.errors[formInput.name];
      break;
    }

    return errorMsg;
  };

  const bottomFormErrorMsg = showErrorOn === "bottom" && getBottomErrorMessage();

  return (
    <Form onSubmit={formik.handleSubmit}>
      {formInputList.map((formInput) => {
        const FormInput = FormInputFactory[formInput.type];
        if (!FormInput) return null;

        return (
          <FormInputGroup key={formInput.name}>
            <FormLabel label={formInput.label} name={formInput.name} />
            <FormInput formInput={formInput} formik={formik} />
          </FormInputGroup>
        );
      })}
      {children}

      {(error?.message || bottomFormErrorMsg) && (
        <ErrorMessageContainer>
          {showErrorOn === "bottom" && getBottomErrorMessage()}
          {error?.message || null}
        </ErrorMessageContainer>
      )}

      <SubmitButton fullWidth={true} type={"submit"} disabled={isLoading}>
        {buttonText}
      </SubmitButton>
    </Form>
  );
};

export default FormikForm;
