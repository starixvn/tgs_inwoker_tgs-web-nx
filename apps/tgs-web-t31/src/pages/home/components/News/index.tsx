// import config from "@tgs-web-nx/config";
// import { GameItem } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { Button as MuiButton, styled as muiStyled } from "@mui/material";
import { useHistory } from "react-router-dom";
import NewIcon from "@/assets/t31/images/home/News.svg";
import sportsIcon from "@/assets/t31/images/home/gameType/desktop/Sports.svg";
import PromotionIcon from "@/assets/t31/images/home/gameType/desktop/Promotion.svg";
import vipIcon from "@/assets/t31/images/account/navItemWhite/icon-vip.svg";

const MainWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  /* justify-content: space-between; */
`;

const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  background: theme.palette.primaryGradient,
  color: theme.palette.text.primary,
  padding: "6px 12px 6px 12px",
  borderRadius: "4px",
  gap: "4px",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "16px",
  letterSpacing: "0em",
  flexGrow: 1,
}));

const NewsButton = muiStyled(StyledButton)(({ theme }) => ({
  background: theme.palette.secondaryGradient,
  color: theme.palette.black,
}));

const News = () => {
  const history = useHistory();

  return (
    <MainWrapper>
      <ButtonWrapper>
        <NewsButton startIcon={<img src={NewIcon} alt="News" />}>
          {i18n.t("T13.topNews")}
        </NewsButton>
        <StyledButton
          startIcon={<img src={sportsIcon} alt="sport" />}
          onClick={() => {
            history.push("/main/sports");
          }}
        >
          {i18n.t("common.sports")}
        </StyledButton>
        <StyledButton
          startIcon={<img src={PromotionIcon} alt="promotion" />}
          onClick={() => {
            history.push("/promotion-list");
          }}
        >
          {i18n.t("common.promotion")}
        </StyledButton>
        <StyledButton
          startIcon={<img src={vipIcon} alt="VIP" />}
          onClick={() => {
            history.push("/vip");
          }}
        >
          VIP
        </StyledButton>
      </ButtonWrapper>
    </MainWrapper>
  );
};

export default News;
