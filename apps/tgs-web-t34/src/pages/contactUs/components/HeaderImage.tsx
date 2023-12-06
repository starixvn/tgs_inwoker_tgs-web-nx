import React from "react";
import styled from "styled-components";
import girlImg from "@/assets/t34/images/contact/girl.png";

const HeaderImageContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  img {
    width: 100%;
  }
`;

const HeaderImage = () => {
  return (
    <HeaderImageContainer>
      <img src={girlImg} alt={"contact"} />
    </HeaderImageContainer>
  );
};

export default HeaderImage;
