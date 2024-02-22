import React, { useMemo } from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import phoneImg from "@/assets/t18/images/account/icon_phone.png";
import emailImg from "@/assets/t18/images/account/icon_email.png";
import birthImg from "@/assets/t18/images/account/icon_birth.png";
import Avatar from "@/components/project/Avatar";

const InfoCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const Border = styled.div`
  border: 1px solid ${({ theme }) => theme.tertiary};
  margin: 0 30px;
  height: 115px;
`;

const InfoItemListContainer = styled.div`
  & > div {
    margin-bottom: 18px;
  }
`;

const InfoItemContainer = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  & > .logo {
    width: 26px;
    height: 26px;
    margin-right: 9px;
  }
  & > img {
    object-fit: contain;
  }

  & > .unbound {
    color: #d7384e;
  }
`;

const VIPCardContainer = styled.div`
  height: 112px;
  width: 372px;
`;

const VIPCard = styled.div<{ $bg: string }>`
  background-image: url(${({ $bg }) => $bg});
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  & img {
    width: 97px;
    height: 90px;
    position: absolute;
    top: 10%;
    right: 10%;
  }
`;

const VIPTextWrapper = styled.div<{ $textColor: string }>`
  position: absolute;
  top: 30%;
  left: 15%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ $textColor }) => $textColor};
`;

const VIPUserName = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
`;

const VIPLevel = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
`;

interface InfoItem {
  infoType: string;
  value: string;
  logoImg: string;
  isNotValid: boolean;
}

const InfoCard = (props: any) => {
  const { account } = useAccountStore();
  const accountInfo = account.info;
  const { isDesktopSize } = useRwd();

  const infoItemList: InfoItem[] = useMemo(() => {
    return [
      {
        infoType: "phone",
        logoImg: phoneImg,
        value: accountInfo.member_phone || i18n.t("profile.notVerify"),
        isNotValid: !accountInfo.member_phone,
      },
      {
        infoType: "email",
        logoImg: emailImg,
        value: accountInfo.member_email || i18n.t("profile.notSet"),
        isNotValid: !accountInfo.member_email,
      },
      {
        infoType: "birth",
        logoImg: birthImg,
        value: accountInfo.member_birthday || i18n.t("profile.notSet"),
        isNotValid: !accountInfo.member_birthday,
      },
    ];
  }, [accountInfo]);

  const getVIPTextColor = () => {
    switch (accountInfo.member_level_id) {
      case 0:
        return "#643E13";
      case 1:
        return "#643E13";
      case 2:
        return "#312F59";
      case 3:
        return "#643E13";
      case 4:
        return "#2E575F";
      case 5:
        return "#73ADF8";
      case 6:
        return "#2D1652";
      case 7:
        return "#550F61";
      case 8:
        return "#64171C";
      case 9:
        return "#713316";
      case 10:
        return "#336E69";
      case 11:
        return "#3D095A";
      default:
        return "#643E13";
    }
  };
  const generateVIPCard = () => {
    return (
      <VIPCardContainer>
        <VIPCard
          $bg={`/assets/images/vip/mobile/card/level_${accountInfo.member_level_id - 1}.png`}
        >
          <img
            src={`/assets/images/vip/mobile/badge/level_${accountInfo.member_level_id - 1}.png`}
            alt="vip"
          />
          <VIPTextWrapper $textColor={getVIPTextColor()}>
            <VIPUserName>{accountInfo.member_username}</VIPUserName>
            <VIPLevel>{`VIP${accountInfo.member_level_id}`}</VIPLevel>
          </VIPTextWrapper>
        </VIPCard>
      </VIPCardContainer>
    );
  };
  return (
    // @ts-ignore
    <InfoCardContainer {...props}>
      {isDesktopSize ? generateVIPCard() : <Avatar />}
      <Border />

      <InfoItemListContainer>
        {infoItemList.map((infoItem) => {
          const { logoImg, infoType, value, isNotValid } = infoItem;
          return (
            <InfoItemContainer key={infoType}>
              <div className={"logo"}>
                <img src={logoImg} alt={"avatar"} />
              </div>

              <span className={isNotValid ? "unbound" : ""}>{value}</span>
            </InfoItemContainer>
          );
        })}
      </InfoItemListContainer>
    </InfoCardContainer>
  );
};

export default InfoCard;
