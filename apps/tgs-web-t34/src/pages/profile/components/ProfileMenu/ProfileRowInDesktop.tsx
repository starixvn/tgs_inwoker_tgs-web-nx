import React from "react";
import styled from "styled-components";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

const ProfileItemContainer = styled.div`
  width: 100%;
  padding: 21px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileRowLabel = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 1.25rem;
  font-weight: 400;
`;
const ProfileStatus = styled.div`
  color: ${({ theme }) => theme.black};
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
        sx={{
          width: "160px",
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
