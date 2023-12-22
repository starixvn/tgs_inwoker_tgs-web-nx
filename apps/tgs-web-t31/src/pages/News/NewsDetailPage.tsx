import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { hardcodeNews } from "@/assets/t31/hardcode";
import newsImg from "@/assets/t31/images/home/newsBG.svg";
import arrow from "@/assets/t31/images/news/Arrow.svg";
const MainWrapper = styled.div`
  width: 1142px;
  margin: 0 auto;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 60px;
`;
const Back = styled.div`
  align-self: center;
  cursor: pointer;
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

const NewsTitle = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 40px;
  font-weight: 400;
  line-height: 47px;
  letter-spacing: 0em;
  text-align: center;
`;
const NewsWriter = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
`;
const NewsContent = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  margin: 40px 0;
`;

const NewsDetailPage = () => {
  const [newsDetail, setNewsDetail] = useState<any>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const getNews = () => {
    const newsDetail = hardcodeNews.find((news) => news.id === id);
    setNewsDetail(newsDetail);
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <MainWrapper>
      <TitleWrapper>
        <Back
          onClick={() => {
            history.push("/news");
          }}
        >
          <img src={arrow} alt="back" />
        </Back>
        <PageTitle>HOT NEWS</PageTitle>
      </TitleWrapper>
      <img src={newsImg} width={"100%"} height={"100%"} alt="news" />
      <NewsTitle>{newsDetail?.title}</NewsTitle>
      <NewsWriter>{newsDetail?.writer}</NewsWriter>
      <NewsContent>{newsDetail?.content}</NewsContent>
    </MainWrapper>
  );
};

export default NewsDetailPage;
