import React from "react";
import styled from "styled-components";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import iconArrow from "@/assets/t27/images/profile/icon-arrow.svg";
import Icon from "@/components/project/Icon";

const ProfileItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & .label {
    color: ${({ theme }) => theme.white};
    font-size: 1.25rem;
    font-weight: 400;
  }

  & .status {
    color: ${({ theme }) => theme.g2};
    font-size: 0.937rem;
    font-weight: 400;
  }

  & svg {
    color: ${({ theme }) => theme.white} !important;
  }
`;

type ProfileItemProps = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInMobile = ({ profileItem, handleClick }: ProfileItemProps) => {
  if (!profileItem) return null;

  const { label, status } = profileItem;

  return (
    <ProfileItemContainer
      onClick={() => {
        if (!profileItem) return;
        handleClick(profileItem);
      }}
    >
      <div>
        <div className={"label"}>{label}</div>
        <div className={"status"}>{status}</div>
      </div>

      <Icon iconUrl={iconArrow} width={"32px"} height={"32px"} />
    </ProfileItemContainer>
  );
};

export default ProfileRowInMobile;
