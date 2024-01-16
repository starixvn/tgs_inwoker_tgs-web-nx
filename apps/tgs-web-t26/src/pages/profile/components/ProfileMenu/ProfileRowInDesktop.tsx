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
  margin-bottom: 33px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileRowLabel = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
`;
const ProfileStatus = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
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
          fontSize: "0.875rem",
          color: isVerified ? theme.black : theme.text,
          background: isVerified ? theme.primary : theme.darkGray,
          border: isVerified ? "none" : `1px solid ${theme.white}`,
          borderRadius: "10px",
          width: "150px",
          height: "42px",
          "&:hover": {
            background: isVerified ? theme.primary : theme.darkGray,
            border: isVerified ? "none" : `1px solid ${theme.white}`,
            color: isVerified ? theme.black : theme.text,
          },
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
