import React from "react";
import styled from "styled-components";
import SystemTime from "@/layouts/components/Header/components/SystemTime";
import OnlineUser from "@/layouts/components/Header/components/OnlineUser";
import Marquee from "@/layouts/components/Header/components/Marquee";

const HeaderGreyRegionContainer = styled.div`
  background: ${({ theme }) => theme.grey03};
`;

const Wrapper = styled.div`
  height: 32px;
  max-width: 1200px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: auto;
`;

const HeaderGreyRegion = () => {
  return (
    <HeaderGreyRegionContainer>
      <Wrapper>
        <OnlineUser />
        <Marquee />
        <SystemTime />
      </Wrapper>
    </HeaderGreyRegionContainer>
  );
};

export default HeaderGreyRegion;
