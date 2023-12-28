import React from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import VipMedal from "@/components/project/VipMedal";
// import VipMedal from "../../../../../../../../tgs-web-t24/src/components/project/VipMedal";

const MemberMenuHeaderContainer = styled.div`
  background: ${({ theme }) => theme.black02};
  width: 175px;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 9px 12px;
`;

const Col = styled.div``;
const VipLevel = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-weight: 400;
`;
const Username = styled.div`
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
`;

const MemberMenuHeader = () => {
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const accountLevel = account.info.member_level_id;

  return (
    <MemberMenuHeaderContainer>
      <VipMedal vipLevel={accountLevel} width={"24px"} />
      <Col>
        <VipLevel>VIP {accountLevel}</VipLevel>

        <Username>{username}</Username>
      </Col>
    </MemberMenuHeaderContainer>
  );
};

export default MemberMenuHeader;
