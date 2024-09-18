import { LabelContainer } from "@/components/styled-component/ProfileForms";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { InfoItem, ItemContainer, ProfileItemContainer } from "./ProfileRowInMobile";



const ProfileRowLabel = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  font-weight: 400;
`;
const ProfileStatus = styled.div`
  color: ${({ theme }) => theme.text};
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
      <ItemContainer style={{padding: "1.6rem", margin: 0}}>
        <LabelContainer >
          {label}
        </LabelContainer>
        <InfoItem className={"status"} style={{ width: "33%" }}>
          {status}
        </InfoItem>

        <Button
          variant={isVerified ? "contained" : "outlined"}
          sx={{
            fontSize: "0.875rem",
            color: isVerified ? theme.white : theme.lightPurple,
            background: isVerified ? theme.primary : theme.memberSection,
            border: isVerified ? `none` : `1px solid ${theme.lightPurple}`,
            width: "150px",
            height: "42px",
            "&:hover": {
              background: isVerified ? theme.primary : theme.memberSection,
              border: isVerified ? `none` : `1px solid ${theme.lightPurple}`,
              color: isVerified ? theme.white : theme.lightPurple,
            },
          }}
          onClick={() => {
            if (!profileItem) return;
            handleClick(profileItem);
          }}
        >
          {buttonText}
        </Button>
      </ItemContainer>
      
    </ProfileItemContainer>
  );
};

export default ProfileRowInDesktop;
