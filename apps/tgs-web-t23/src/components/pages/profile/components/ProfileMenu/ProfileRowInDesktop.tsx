import { ProfileItem } from "@/core/hooks/account/useProfileMenu";
import { useTheme } from "@mui/material";
import { Button } from "@/components/UI/Button";
import React from "react";
import styled from "styled-components";
import { theme } from "@/theme";

const ProfileItemContainer = styled.div`
  width: 100%;
  padding: 21px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileRowLabel = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 400;
`;
const ProfileStatus = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.93rem;
  font-weight: 400;
`;

type Props = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInDesktop = ({ profileItem, handleClick }: Props) => {
  if (!profileItem) return null;

  const { label, isVerified, status, buttonText } = profileItem;

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
          background: isVerified
            ? "linear-gradient(90deg, #FACE27 49.23%, #F3AF16 49.42%)"
            : "none",
          border: isVerified ? "none" : "1px solid white",
          width: "160px",
          borderRadius: "30px",
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
