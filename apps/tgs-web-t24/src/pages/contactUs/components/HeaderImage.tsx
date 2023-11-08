import React from "react";
import styled from "styled-components";
import contactGirlImg from "@/assets/t24/images/contact/contact.png";

const HeaderImageContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;

const HeaderImage = () => {
  return (
    <HeaderImageContainer>
      <img src={contactGirlImg} alt={"contact"} />
    </HeaderImageContainer>
  );
};

export default HeaderImage;
