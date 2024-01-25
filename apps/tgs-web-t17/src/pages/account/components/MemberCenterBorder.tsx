import React from "react";
import styled from "styled-components";

const MemberCenterBorderContainer = styled.div`
  position: relative;
  border-bottom: 1px solid white;
  margin-left: 29px;
  overflow: visible;
`;

const Label = styled.div`
  background-color: #E4E4E4;
  font-size: 0.75rem;
  font-weight: 400;
  padding: 3px 15px;
  border-radius: 50px;
  color: ${({ theme }) => theme.gray};
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
`;

const MemberCenterBorder = () => {
  return (
    <MemberCenterBorderContainer>
      <Label>Member Center</Label>
    </MemberCenterBorderContainer>
  );
};

export default MemberCenterBorder;
