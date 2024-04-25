import { i18n } from "@tgs-web-nx/utils";
import { useCreatePlayerStageWithSMSVerify } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  display: flex;
  align-items: start;
`;

const CreatePlayerStageWithSMSVerifyStage = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    //  confirmAdult
    isConfirmedAdult,
    handleClickConfirmAdult,
  } = useCreatePlayerStageWithSMSVerify();

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
        {i18n
          .t("web.register.contractWithAge")
          .replace(/{age}/g, `${brandConfig[mapBrandName(config.brand)].contractAge}`)}
      </VerifyAgeContainer>
    </FormikForm>
  );
};

export default CreatePlayerStageWithSMSVerifyStage;
