import { FormInputFactory } from "@/components/project/FormikForm/FormInputFactory";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import { FormikFormInput } from "@tgs-web-nx/core/features";
import React from "react";
import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  color: ${({ theme }) => theme.errorColor};
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex-shrink: 0;
  padding: 0 2.4rem;
`;

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

        return <FormInput key={formInput.name} formInput={formInput} formik={formik} />;
      })}
      {children}

      {(error?.message || bottomFormErrorMsg) && (
        <ErrorMessageContainer>
          {showErrorOn === "bottom" && getBottomErrorMessage()}
          {error?.message || null}
        </ErrorMessageContainer>
      )}

      <SubmitButton fullWidth={true} type={"submit"} disabled={isLoading}>
        Sign Up
      </SubmitButton>
    </Form>
  );
};

export default FormikForm;
