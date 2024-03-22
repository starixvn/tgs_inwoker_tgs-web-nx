import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const TabButtonContainer = styled.div`
  height: 90px;
`;

const ButtonAddCard = styled.div`
  width: 100px;
  height: 50px;
  border: 1px solid #d9d9d9;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  &:before {
    content: "+";
    width: 50px;
    height: 50px;
    font-size: 50px;
    line-height: 50px;
  }
`;

const DepositAddCard = () => {
  const history = useHistory();

  const handleAddCard = useCallback(() => {
    history.push("/card/add?do=deposit");
  }, []);

  return (
    <TabButtonContainer>
      <ButtonAddCard onClick={handleAddCard}></ButtonAddCard>
    </TabButtonContainer>
  );
};

export default DepositAddCard;
