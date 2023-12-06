import { useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import { Button } from "@/components/UI/Button";

const ProfileItemContainer = styled.div`
  width: 100%;
  padding: 21px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ProfileRowLabel = styled.div`
  color: ${({ theme }) => theme.gray30};
  font-size: 1.25rem;
  font-weight: 400;
`;
const ProfileStatus = styled.div`
  color: ${({ theme }) => theme.gray40};
  font-size: 0.93rem;
  font-weight: 400;
`;

type Props = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInDesktop = ({ profileItem, handleClick }: Props) => {
  const theme: any = useTheme();
  if (!profileItem) return null;

  const { label, isVerified, status, buttonText } = profileItem;

  return (
    <ProfileItemContainer>
      <ProfileRowLabel className={"label"} style={{ width: "20%" }}>
        {label}
      </ProfileRowLabel>
      <ProfileStatus className={"status"} style={{ width: "20%" }}>
        {status}
      </ProfileStatus>

      <Button
        variant={isVerified ? "contained" : "outlined"}
        sx={{
          fontSize: "1rem",
          color: isVerified ? theme.palette.white : theme.palette.gray5,
          background: isVerified ? theme.palette.primary : theme.palette.gray90,
          border: isVerified ? "none" : `1px solid ${theme.palette.gray70}`,
          width: "150px",
          marginLeft: "auto",
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
