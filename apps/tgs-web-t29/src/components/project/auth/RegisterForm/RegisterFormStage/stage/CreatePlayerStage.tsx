import { i18n } from "@tgs-web-nx/utils";
import { useCreatePlayerStage } from "@tgs-web-nx/core/features";
import styled from "styled-components";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import {useTrackFacebookPixel} from "@tgs-web-nx/core/hooks";
import FormikForm from "@/components/project/FormikForm";
import { Checkbox } from "@/components/UI/Checkbox";

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  display: flex;
  align-items: start;
`;

const CreatePlayerStage = () => {
  const {sendFbTrack} = useTrackFacebookPixel();
  const {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    //  confirmAdult
    isConfirmedAdult,
    handleClickConfirmAdult,
  } = useCreatePlayerStage(() => {
    sendFbTrack('AddToCart'); // movn register success
  });
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

export default CreatePlayerStage;
