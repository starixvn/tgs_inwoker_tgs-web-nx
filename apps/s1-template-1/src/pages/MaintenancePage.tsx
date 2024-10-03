import { DarkBlueGradientButton } from "@/components/UI/Button";
import { useGoToHomePage } from "@/hooks/useGoToHomePage";
import { UiService, useGeneralStore } from "@tgs-web-nx/core";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const MaintenanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.white};
`;

const ContentContainer = styled.div`
  margin-top: 6rem;
`;
const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 12px;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
`;
const CSButton = styled(Button)`
  cursor: pointer;
  background: ${({ theme }) => theme.memberSection};
  color: ${({ theme }) => theme.lightPurple};
  border: ${({ theme }) => `1px solid ${theme.lightPurple}`};
`;
const IMButton = styled(Button)`
  background: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const LabelContainer = styled.div`
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.4px;
  text-transform: capitalize;
  text-align: center;
`;

const LabelSmall = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.32px;
  text-transform: capitalize;
  text-align: center;
`;

const LabelTime = styled(LabelSmall)`
  font-weight: 700;
  color: #DFFF03;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomWrapper = styled.div`
  position: relative;
  top: -8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.2rem;
`;

const ContentMsg = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.32px;
  text-align: center;
  padding-top: 1.2rem;
`
  

const DefaultMaintenance = () => {
  return (
    <>
      <p>We are currently under maintenance, please try again later.</p>
      <p>If you have any questions,please contact our customer service.</p>
    </>
  );
};

const MaintenancePage = () => {
  const history = useHistory();
  const { GetMaintenance } = UiService;
  const {
    general: { livechat, brandsSupport, isMaintenance },
  } = useGeneralStore();
  const goToHomePage = useGoToHomePage();

  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");
  const [isFailed, setFailed] = useState(false);

  const newURL = livechat.setting?.url.replace("{lang}", i18n.language);
  const handleCSClick = () => {
    if (newURL?.length) {
      Common.PopupCenter(newURL, "", 785, 750);
    }
  };

  const handleIMClick = () => {
    // TODO: handle IM click
    console.log("%c⧭", "color: #d90000", "brandsSupport", brandsSupport);
    history.push("/support");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(history.location.search);
    const isGameMaintenance = searchParams.get("isGameMaintenance");
    // NOTE: while GeneralService.GetSiteToken encounter error,
    // then general.isMaintenance will set to false
    if (!isMaintenance && !isGameMaintenance) {
      goToHomePage();
      return;
    }

    const fetchGetMaintenance = async () => {
      const result = await GetMaintenance();

      if (!result.IsSuccess) {
        setFailed(true);
        return;
      }

      if (!result.data) {
        return;
      }

      if (result.data.beginTime) {
        setBeginTime(result.data.beginTime);
      }
      if (result.data.beginTime) {
        setEndTime(result.data.endTime);
      }
      if (result.data.content) {
        setContent(result.data.content);
      }
    };

    fetchGetMaintenance();
  }, []);

  const showContactButton = !!newURL?.length;
  const showImButton = !!brandsSupport.length;
  
  return (
    <MaintenanceContainer>
      <ContentContainer>
          {/* {isFailed && <DefaultMaintenance />} */}
          <LabelContainer>We are under maintainace</LabelContainer>
          <LabelSmall>Will be back soon</LabelSmall>
          {beginTime && <LabelTime>Time {beginTime} to {endTime}</LabelTime>}
          <ImgWrapper><img alt="maintainance" src="/assets/images/maintainance/image-error.png"/></ImgWrapper>          
          <BottomWrapper>
            <DarkBlueGradientButton sx={{width: "20rem"}} onClick={() => {history.push("/")}}>Go to home page </DarkBlueGradientButton>
            <ContentMsg>{content}</ContentMsg>
          </BottomWrapper>
        {/* <ButtonGroupContainer>
          {showContactButton && <CSButton onClick={handleCSClick}>Contact Customer</CSButton>}
          {showImButton && <IMButton onClick={handleIMClick}>Instant Messaging</IMButton>}
        </ButtonGroupContainer> */}
      </ContentContainer>
    </MaintenanceContainer>
  );
};

export default MaintenancePage;
