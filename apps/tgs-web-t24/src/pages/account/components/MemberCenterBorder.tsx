import React from "react";
import styled from "styled-components";

const MemberCenterBorderContainer = styled.div`
  position: relative;
  border-bottom: 1px solid white;
  margin-left: 29px;
  overflow: visible;
`;

const Label = styled.div`
  background: linear-gradient(90deg, #7135f3 50.07%, #5e20cf 50.54%);
  font-size: 0.75rem;
  font-weight: 400;
  padding: 3px 15px;
  border-radius: 50px;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
`;

type Props = {};
const MemberCenterBorder = (props: Props) => {
  return (
    <MemberCenterBorderContainer>
      <Label>Member Center</Label>
    </MemberCenterBorderContainer>
  );
};

export default MemberCenterBorder;
