import React from "react";
import styled from "styled-components";
import { useAccountStore } from "@tgs-web-nx/core";
import avatarImg from "@/assets/t18/images/account/avatar.png";

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.tertiary};
`;

const AvatarImg = styled.div<{ $size?: string }>`
  width: ${({ $size }) => ($size === "small" ? "35px" : "73px")};
  height: ${({ $size }) => ($size === "small" ? "35px" : "66px")};
  background-image: url(${avatarImg});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
`;

const VIPLevel = styled.div<{ $size?: string }>`
  position: absolute;
  bottom: 15%;
  right: 15%;
  font-size: ${({ $size }) => ($size === "small" ? "8px" : "12px")};
  font-style: italic;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
  text-shadow:
    -1px -1px 0 #ae1f1f,
    1px -1px 0 #ae1f1f,
    -1px 1px 0 #ae1f1f,
    1px 1px 0 #ae1f1f;
`;

type Props = {
  hideName?: boolean;
  size?: string;
};
const Avatar = ({ hideName, size }: Props) => {
  const { account } = useAccountStore();
  const userLevel = account.info.member_level_id;
  const username = account.info.member_username;

  return (
    <AvatarContainer>
      <AvatarImg $size={size}>
        <VIPLevel $size={size}>{`V${userLevel}`}</VIPLevel>
      </AvatarImg>
      {!hideName && username}
    </AvatarContainer>
  );
};

export default Avatar;
