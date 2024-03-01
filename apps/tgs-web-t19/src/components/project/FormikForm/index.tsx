import React from "react";
import styled from "styled-components";
import { FormikFormInput } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { FormInputFactory } from "@/components/project/FormikForm/FormInputFactory";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import { media } from "@/theme/breakpoints";

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
  gap: 18px;
  flex-shrink: 0;
  position: relative;

  ${media.sm} {
    min-height: 494px;
  }
`;

const SubmitButtonWrapper = styled.div`
  ${media.sm} {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
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
  const { isMobileSize } = useRwd();

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

      <SubmitButtonWrapper>
        <SubmitButton
          fullWidth={true}
          type={"submit"}
          disabled={isLoading}
          style={{ borderRadius: isMobileSize ? "100px" : "6px" }}
        >
          {buttonText}
        </SubmitButton>
      </SubmitButtonWrapper>
    </Form>
  );
};

export default FormikForm;
