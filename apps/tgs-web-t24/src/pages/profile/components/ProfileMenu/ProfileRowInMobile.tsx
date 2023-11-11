import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { ProfileItem } from "@tgs-web-nx/core/hooks";

const ProfileItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & .label {
    color: ${({ theme }) => theme.gray30};
    font-size: 1.25rem;
    font-weight: 400;
  }

  & .status {
    color: ${({ theme }) => theme.gray40};
    font-size: 0.93rem;
    font-weight: 400;
  }
`;

const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

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

      <IconContainer>
        <NavigateNextIcon style={{ transform: "scale(1.3)" }} />
      </IconContainer>
    </ProfileItemContainer>
  );
};

export default ProfileRowInMobile;
