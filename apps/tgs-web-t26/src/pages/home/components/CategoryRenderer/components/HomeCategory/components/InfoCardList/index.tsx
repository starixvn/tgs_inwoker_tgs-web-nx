import styled from "styled-components";
import logoCompatibleImg from "@/assets/t26/images/home/logo_compatible.svg";
import logoConvenientImg from "@/assets/t26/images/home/logo_convenient.svg";
import logoExtensiveImg from "@/assets/t26/images/home/logo_extensive.svg";
import logoSecureImg from "@/assets/t26/images/home/logo_secure.svg";
import { InfoCardItem } from "@/pages/download/components/InfoCard";

const InfoCardListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoCardLogo = styled.div``;

const InfoCardText = styled.div`
  width: 200px;
`;

const InfoCardTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  color: ${({ theme }) => theme.primary};
`;

const InfoCardContent = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
`;

const infoCardItemList: InfoCardItem[] = [
  {
    title: "COMPATIBLE",
    content: "App supports any ios and android devices.",
    logo: logoCompatibleImg,
  },
  {
    title: "SECURE",
    content: "Android and ios replicates teh same safety standards.",
    logo: logoSecureImg,
  },
  {
    title: "EXTENSIVE",
    content: "Access to more than 1000+ games including sports betting and more.",
    logo: logoExtensiveImg,
  },
  {
    title: "CONVENIENT",
    content: "User friendly interface simple, clear, and extremely engaging.",
    logo: logoConvenientImg,
  },
];

const InfoCardList = () => {
  return (
    <InfoCardListContainer>
      {infoCardItemList.map((infoCardItem) => {
        const { logo, title, content } = infoCardItem;
        return (
          <InfoCard key={infoCardItem.title}>
            <InfoCardLogo>
              <img src={logo} alt={title} />
            </InfoCardLogo>

            <InfoCardText>
              <InfoCardTitle>{title}</InfoCardTitle>
              <InfoCardContent>{content}</InfoCardContent>
            </InfoCardText>
          </InfoCard>
        );
      })}
    </InfoCardListContainer>
  );
};

export default InfoCardList;
