import React from "react";
import styled from "styled-components";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

const ProfileItemContainer = styled.div`
  width: 100%;
  //padding: 9.5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 33px; */

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileRowLabel = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 400;
`;
const ProfileStatus = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.937rem;
  font-weight: 400;
`;

type Props = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInDesktop = ({ profileItem, handleClick }: Props) => {
  if (!profileItem) return null;

  const { label, status, buttonText, isVerified } = profileItem;
  return (
    <ProfileItemContainer>
      <ProfileRowLabel className={"label"} style={{ width: "33%" }}>
        {label}
      </ProfileRowLabel>
      <ProfileStatus className={"status"} style={{ width: "33%" }}>
        {status}
      </ProfileStatus>

      <Button
        variant={isVerified ? "contained" : "outlined"}
        sx={{
          fontSize: "1.25rem",
          color: isVerified ? theme.black : theme.white,
          background: isVerified ? theme.primaryGradient : "transparent",
          border: isVerified ? "none" : "1px solid #fff",
          width: "160px",
          height: "44px",
          borderRadius: "10px",
          fontWeight: "400",
        }}
        onClick={() => {
          if (!profileItem) return;
          handleClick(profileItem);
        }}
      >
        {buttonText}
      </Button>
    </ProfileItemContainer>
  );
};

export default ProfileRowInDesktop;
