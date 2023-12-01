import React from "react";
import * as Yup from "yup";
import styled from "styled-components";
import { FormInputTypeEnum } from "@tgs-web-nx/core/features";
import { FormInputFactory } from "@/components/project/FormikForm/FormInputFactory";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

const ErrorMessageContainer = styled.div`
  color: ${({ theme }) => "red"};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin-top: 24px;
`;

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
  children: React.ReactNode;
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
    // console.log(formik.errors);
    for (const formInput of formInputList) {
      if (!(formik.touched[formInput.name] && formik.errors[formInput.name])) continue;

      errorMsg = formik.errors[formInput.name];
      break;
    }

    return errorMsg;
  };

  const bottomFormErrorMsg = showErrorOn === "bottom" && getBottomErrorMessage();

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <SubmitButton
        fullWidth={true}
        style={{ margin: "24px 0" }}
        type={"submit"}
        disabled={isLoading}
      >
        {buttonText}
      </SubmitButton>
    </form>
  );
};

export default FormikForm;
