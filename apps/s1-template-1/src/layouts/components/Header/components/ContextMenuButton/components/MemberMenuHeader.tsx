import Icon from "@/components/project/Icon";
import { useAccountStore } from "@tgs-web-nx/core";
import React from "react";
import styled from "styled-components";

const MemberMenuHeaderContainer = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.black};
  height: 44px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 12px 10px 10px;
`;
type Props = {
  handleCloseContextMenu: () => void;
};

const MemberMenuHeader = ({ handleCloseContextMenu }: Props) => {
  const { account } = useAccountStore();
  const username = account.info.member_username;

  return (
    <MemberMenuHeaderContainer>
      <Icon iconUrl={""} width={"24px"} height={"24px"} />
      {username}
      <Icon
        iconUrl={""}
        width={"16px"}
        height={"16px"}
        style={{
          cursor: "pointer",
          marginLeft: "auto",
        }}
        onClick={() => handleCloseContextMenu()}
      />
    </MemberMenuHeaderContainer>
  );
};

export default MemberMenuHeader;
