import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import ContactIcon from "@/assets/t18/images/header/contactIcon.svg";
import { media } from "@/theme/breakpoints";

const ContactButtonContainer = styled.div`
  display: none;

  ${media.sm} {
    width: 33px;
    height: 33px;
    background: ${({ theme }) => theme.mainBackground};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    margin-left: 10px;
  }
`;

const ContactButton = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push("/support");
  }, []);

  return (
    <ContactButtonContainer onClick={handleClick}>
      <Icon iconUrl={ContactIcon} width={"27px"} height={"27px"} />
    </ContactButtonContainer>
  );
};

export default ContactButton;
