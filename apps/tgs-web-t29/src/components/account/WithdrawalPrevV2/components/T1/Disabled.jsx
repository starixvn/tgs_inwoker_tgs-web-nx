import React from "react";

import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { Button } from "@/components/UI/Button";

const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-top: 50px;
`;
const SubTitleDesc = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: table;
  width: 540px;
  display: flex;
  justify-content: space-around;
`;

const Disabled = ({ handleCSClick }) => {
  return (
    <Container>
      <SubTitle>{i18n.t("disabledAddCard.title")}</SubTitle>
      <SubTitleDesc>{i18n.t("disabledAddCard.description")}</SubTitleDesc>

      <ButtonContainer>
        {(!config.features.ChangesNotAllowed || config.features.AddCard_NotAllowedEditDelete) && (
          <Button width={255} handleClick={handleCSClick}>
            {i18n.t("support.online")}
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default Disabled;
