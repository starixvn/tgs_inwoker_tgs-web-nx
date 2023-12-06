import styled from "styled-components";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Common, i18n } from "@tgs-web-nx/utils";
import { UiService, useGeneralStore } from "@tgs-web-nx/core";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { media } from "@/theme/breakpoints";

const MaintenanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  //height: calc(100vh - 80px - 82px);
  height: 100vh;
  color: #ffffff;
  background: black;
`;
const MaintenanceBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(${import.meta.env.BASE_URL}assets/images/maintenance/maintenance_bg.png) center;
  background-size: cover;
  //background-position: center;

  ${media.sm} {
    background: url(${import.meta.env.BASE_URL}assets/images/maintenance/maintenance_desktop_bg.png)
      center;
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  left: 42px;
  top: 44px;
  width: 232px;

  ${media.sm} {
    left: 26.4%;
    top: 5.6%;
    width: 25.2%;
  }
`;
const TextContainer = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  max-height: 300px;
  overflow: auto;
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
  color: #ffffff;
  font-weight: 500;
`;
const CSButton = styled(Button)`
  cursor: pointer;
  background: ${({ theme }) => theme.secondaryGradient};
  color: ${({ theme }) => theme.mainBackground};
  font-family: SF Pro;
  font-size: 16px;
  font-weight: 590;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`;
const IMButton = styled(Button)`
  background: ${({ theme }) => theme.primaryGradient};
  cursor: pointer;
  font-family: SF Pro;
  font-size: 16px;
  font-weight: 590;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`;

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
  const { handleChangeGameType } = useHomeGameContext();

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
      handleChangeGameType(GameTypeEnum.NONE);
      history.push("/");
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
      <MaintenanceBg />
      <ContentContainer>
        <TextContainer>
          {isFailed && <DefaultMaintenance />}
          {content && (
            <>
              <p>
                {i18n.t("common.maintenance")}: <br />
                {beginTime} ~ {endTime} (GMT+8){" "}
              </p>
              <p
                style={{ color: "#ffffff" }}
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </>
          )}
        </TextContainer>
        <ButtonGroupContainer>
          {showContactButton && <CSButton onClick={handleCSClick}>Contact Customer</CSButton>}
          {showImButton && <IMButton onClick={handleIMClick}>Instant Messaging</IMButton>}
        </ButtonGroupContainer>
      </ContentContainer>
    </MaintenanceContainer>
  );
};

export default MaintenancePage;
