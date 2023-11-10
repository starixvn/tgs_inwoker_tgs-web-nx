import styled from "styled-components";
import { useHistory } from "react-router-dom";
import IconLabel from "@/pages/home/components/HomePromotionCard/components/IconLabel";
import google from "@/assets/t24/images/home/google.svg";
import twitch from "@/assets/t24/images/home/twitch.svg";
import steam from "@/assets/t24/images/home/steam.svg";
import { media } from "@/theme/breakpoints";
import register from "@/assets/t24/images/home/register.svg";
import deposit from "@/assets/t24/images/home/deposit.svg";
import star from "@/assets/t24/images/home/star.svg";
import rightArrow from "@/assets/t24/images/home/right-arrow.svg";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.gray70};
  color: ${({ theme }) => theme.white};
  padding: 32px 24px 14px 24px;

  ${media.sm} {
    max-width: 348px
  }
`;

const HomePromotionCardTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.92rem;
  font-weight: 700;
  letter-spacing: 0.008rem;
`;

const HomePromotionCardContent = styled.div`
  text-align: center;
  line-height: 24px;
  color: ${({ theme }) => theme.white};
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.008rem;
`;

const RegisterBtn = styled.div`
  width: 348px;
  height: 48px;
  padding: 16px 133.405px 16px 133.595px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const LinkIconGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 87px;
  height: 48px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.gray30};

  & img {
    width: 24px;
    height: 24px;
  }
`;

const IconLabelGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px 14px 24px;
  gap: 16px;
  align-self: stretch;
  max-height: 42px;
`;

const RightArrowIcon = styled.img`
  width: 10.73px;
  height: 12px;
`;

const HomePromotionCard = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <HomePromotionCardTitle>Welcome to PG!</HomePromotionCardTitle>
      <HomePromotionCardContent>Register and receive<br />deposit bonus up to R$ <br />1,000!</HomePromotionCardContent>
      <RegisterBtn onClick={() => history.push("/register")}>Register</RegisterBtn>

      <LinkIconGroup>
        <LinkIcon><img src={google} alt={"google"} /></LinkIcon>
        <LinkIcon><img src={steam} alt={"steam"} /></LinkIcon>
        <LinkIcon><img src={twitch} alt={"twitch"} /></LinkIcon>
      </LinkIconGroup>

      <IconLabelGroup>
        <IconLabel
          imageUrl={register}
          text={"Register"}
        />
        <RightArrowIcon src={rightArrow} alt={"enter"} />
        <IconLabel
          imageUrl={deposit}
          text={"Deposit"}
        />
        <img src={rightArrow} alt={"enter"} />
        <IconLabel
          imageUrl={star}
          text={"Earn Bonus!"}
        />
      </IconLabelGroup>
    </Wrapper>
  );
};

export default HomePromotionCard;
