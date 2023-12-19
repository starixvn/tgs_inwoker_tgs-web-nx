import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory,useParams } from "react-router";
import { hardcodeNews } from "@/pages/home/components/News/hardcoded";
import newsImg from "@/assets/t31/images/home/newsBG.svg";

const MainWrapper = styled.div`
  width: 1142px;
  margin: 0 auto;
`;
const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 64px;
  font-style: italic;
  font-weight: 700;
  line-height: 75px;
  letter-spacing: 0em;
  text-align: left;
  margin: 60px 0;
  color: ${({ theme }) => theme.text};
`;
const NewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
`;

const NewsContent = styled.div`
  display: flex;
  gap: 12px;
  cursor: pointer;
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
`;

const NewsPage = () => {
  const history = useHistory();
  return (
    <MainWrapper>
      <PageTitle>HOT NEWS</PageTitle>
      <img src={newsImg} width={"100%"} height={"100%"} alt="news" />

      <NewsListContainer>
        {hardcodeNews.map((news) => {
          return (
            <NewsContent
              key={news.id}
              onClick={() => {
                history.push("/news/" + news.id);
              }}
            >
              <NewsImgContainer>
                <img src={newsImg} width={"100%"} height={"100%"} alt="news" />
              </NewsImgContainer>
              <NewsTextWrapper>
                <NewTitle>{news.title}</NewTitle>
                <NewsText>{news.content}</NewsText>
              </NewsTextWrapper>
            </NewsContent>
          );
        })}
      </NewsListContainer>
    </MainWrapper>
  );
};

export default NewsPage;
