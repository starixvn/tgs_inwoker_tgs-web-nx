import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import { useCreatePlayerStage } from "@tgs-web-nx/core/features";
import React from "react";
import styled from "styled-components";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  display: flex;
  align-items: center;
`;

const CreatePlayerStage = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    //  confirmAdult
    isConfirmedAdult,
    handleClickConfirmAdult,
  } = useCreatePlayerStage();
  return (
    <FormikForm
      formInputList={formInputConfigList}
      formik={formik}
      isLoading={isLoading}
      error={registerError}
      buttonText={"Sign Up"}
    >
      <VerifyAgeContainer>
        <Checkbox value={isConfirmedAdult} onClick={handleClickConfirmAdult} />I agree to the User
        Agreement & confirm I am at least 18 years old
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStage;
