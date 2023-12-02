import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import PopupAnnouncement from "@/components/project/Popup/PopupAnnouncement";
import Loading from "@/components/UI/Loading";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box;
  width: 100%;
  min-height: 611px;
  background-color: ${({ theme }) => {
    return theme.customProfileBackground100 ? theme.customProfileBackground100 : "#eaeaea";
  }};
`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;

const InnerWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: ${({ theme }) => {
    return theme.darkMode ? theme.customProfileBackground80 : "#f7f7f7";
  }};

  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

const Template1 = ({ openAnnouncement, loading, handleCloseAnnouncement, switchDisplayView }) => {
  return (
    <Container>
      <PopupAnnouncement
        open={openAnnouncement}
        onClose={() => {
          handleCloseAnnouncement();
        }}
        text={i18n.t("card.toEdit")}
      />
      <Title>{i18n.t("withdrawal.title")}</Title>
      <InnerWrap>
        {switchDisplayView()}
        <Loading show={loading} />
      </InnerWrap>
    </Container>
  );
};

export default Template1;
