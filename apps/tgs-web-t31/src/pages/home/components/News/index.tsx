import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { Button as MuiButton, styled as muiStyled } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
// import { hardcodeNews } from "./hardcoded";
import { hardcodeNews } from "@/assets/t31/hardcode";

import NewIcon from "@/assets/t31/images/home/News.svg";
import sportsIcon from "@/assets/t31/images/home/gameType/desktop/Sports.svg";
import PromotionIcon from "@/assets/t31/images/home/gameType/desktop/Promotion.svg";
import vipIcon from "@/assets/t31/images/account/navItemWhite/icon-vip.svg";
import newsImg from "@/assets/t31/images/home/newsBG.svg";

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

const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
`;

const NewsContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const NewsImgContainer = styled.div`
  flex-shrink: 0;
`;

const NewsTextWrapper = styled.div``;
const NewTitle = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
`;
const NewsText = styled.div`
  color: ${({ theme }) => theme.activeNav};
  max-height: 40px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
`;

const NewsButton = muiStyled(StyledButton)(({ theme }) => ({
  background: theme.palette.secondaryGradient,
  color: theme.palette.black,
}));

const ReadMoreWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 16px;
`;
const ReadMoreButton = muiStyled(MuiButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.accountLableText}`,
  justifyContent: "right",
}));

const MoreWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MoreButton = muiStyled(MuiButton)(({ theme }) => ({
  width: "120px",
  height: "34px",
  color: theme.palette.secBTNOutline,
  border: `1px solid ${theme.palette.secBTNOutline}`,
  justifyContent: "center",
}));

const News = () => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();

  return (
    <MainWrapper>
      <ButtonWrapper>
        <NewsButton startIcon={<img src={NewIcon} alt="News" />}>
          {i18n.t("T13.topNews")}
        </NewsButton>
        <StyledButton
          startIcon={<img src={sportsIcon} alt="sport" />}
          onClick={() => {
            handleChangeGameType(GameTypeEnum.SPORTS);
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
      <NewsListContainer>
        {hardcodeNews.map((news) => {
          return (
            <NewsContent key={news.id}>
              <NewsImgContainer>
                <img src={newsImg} width={"100%"} height={"100%"} alt="news" />
              </NewsImgContainer>
              <NewsTextWrapper>
                <NewTitle>{news.title}</NewTitle>
                <NewsText>{news.content}</NewsText>
                <ReadMoreWrapper>
                  <ReadMoreButton
                    onClick={() => {
                      history.push("/news/" + news.id);
                    }}
                  >
                    READ MORE
                  </ReadMoreButton>
                </ReadMoreWrapper>
              </NewsTextWrapper>
            </NewsContent>
          );
        })}
        <MoreWrapper>
          <MoreButton
            onClick={() => {
              history.push("/news/");
            }}
          >
            MORE
          </MoreButton>
        </MoreWrapper>
      </NewsListContainer>
    </MainWrapper>
  );
};

export default News;
