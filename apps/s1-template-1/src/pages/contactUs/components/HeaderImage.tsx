import React from "react";
import styled from "styled-components";

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
      <img src={""} alt={"contact"} />
    </HeaderImageContainer>
  );
};

export default HeaderImage;
