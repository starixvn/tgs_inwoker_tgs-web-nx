import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import iconPromotion from "@/assets/t28/images/account/navItem/icon-promotions.svg";
import iconVip from "@/assets/t28/images/account/navItem/icon-vip.svg";
import iconDeposit from "@/assets/t28/images/account/navItem/icon-deposit.svg";
import iconWithdraw from "@/assets/t28/images/account/navItem/icon-withdraw.svg";
import iconTransfer from "@/assets/t28/images/account/navItem/icon-transfer.svg";
import hotIcon from "@/assets/t28/images/account/navItem/hot.svg";
import downloadIcon from "@/assets/t28/images/account/navItem/icon-download.svg";
import MenuLanguageSwitch from "@/components/project/LanguageSwitch/MenuLanguageSwitch";
import SocialMedia from "@/components/project/SocialMedia";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.memberSection};
  width: 100%;
  height: 100vh;
  padding-bottom: 20px;
`;

const HeaderContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  gap: 12px;
  margin: 0 16px;
`;

const PromotionCard = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: start;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 1.375rem;
  line-height: 1.611rem;
  font-weight: 700;
  transition: all 0.2s ease-in-out;
  gap: 12px;
`;

const IconText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;

const HotText = styled(IconText)`
  color: ${({ theme }) => theme.orange};
`;

const DownloadWrapper = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.gray20}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.gray20}`};
  padding: 24px 0;
  display: flex;
  justify-content: center;
  margin: 16px;
`;

const DownloadButton = styled.div`
  width: 100%;
  height: 52px;
  padding: 24px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primary};
`;

const DownloadIconWrapper = styled.div`
  margin-right: 12px;
`;

const SocialMediaWrapper = styled.div`
  width: 212px;
  gap: 10px;
  margin: 16px;
`;

const SocialMediaTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.gray50};
  margin-bottom: 12px;
`;

const DesktopMenuDrawer = () => {
  const history = useHistory();

  type SideMenuItem = {
    key: string;
    iconUrl: string;
    label: string;
    routePath: string;
  };

  const sideMenuList: SideMenuItem[] = [
    {
      key: "promotion",
      iconUrl: iconPromotion,
      label: i18n.t("common.promotion"),
      routePath: "/promotion-list",
    },
    {
      key: "vip",
      iconUrl: iconVip,
      label: "VIP",
      routePath: "/vip",
    },
    {
      key: "deposit",
      iconUrl: iconDeposit,
      label: i18n.t("common.deposit"),
      routePath: "/deposit",
    },
    {
      key: "withdrawal",
      iconUrl: iconWithdraw,
      label: i18n.t("common.withdrawal"),
      routePath: "/withdrawal",
    },

    {
      key: "transfer",
      iconUrl: iconTransfer,
      label: i18n.t("common.transfer"),
      routePath: "/transfer",
    },
  ];

  return (
    <MobileMenuDrawerContainer>
      <HeaderContentContainer>
        {sideMenuList.map((item: SideMenuItem) => {
          return (
            <PromotionCard
              key={item.key}
              onClick={() => {
                history.push(item.routePath);
              }}
            >
              <img src={item.iconUrl} alt={item.label} />
              {item.key === "promotion" || item.key === "vip" ? (
                <>
                  <HotText>{item.label}</HotText>
                  <img src={hotIcon} alt="hot" />
                </>
              ) : (
                <IconText>{item.label}</IconText>
              )}
            </PromotionCard>
          );
        })}
      </HeaderContentContainer>
      {/* TODO: remove for phase 1 */}
      {/* <DownloadWrapper>
        <DownloadButton>
          <DownloadIconWrapper
            onClick={() => {
              history.push("/appDownload");
            }}
          >
            <img src={downloadIcon} alt="download" />
          </DownloadIconWrapper>
          {i18n.t("common.download")}
        </DownloadButton>
      </DownloadWrapper> */}

      <SocialMediaWrapper>
        <SocialMediaTitle>Official Channel</SocialMediaTitle>
        <SocialMedia />
      </SocialMediaWrapper>
      <MenuLanguageSwitch style={{ width: "100%" }} />
    </MobileMenuDrawerContainer>
  );
};

export default DesktopMenuDrawer;
