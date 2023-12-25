import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";
import { useCreatePlayerStage } from "@/hooks/auth/stage/useCreatePlayerStage";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
`;

const RegisterContract = styled.div`
  max-width: 500px;
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
      buttonText={i18n.t("createaccount")}
    >
      <VerifyAgeContainer>
        <Checkbox value={isConfirmedAdult} onClick={handleClickConfirmAdult} />
        <RegisterContract>{i18n.t("web.register.contract")}</RegisterContract>
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStage;
