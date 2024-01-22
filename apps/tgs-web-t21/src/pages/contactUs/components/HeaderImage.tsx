import React from "react";
import styled from "styled-components";
import contactGirlImg from "@/assets/t21/images/contact/contact.jpg";

const HeaderImageContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
