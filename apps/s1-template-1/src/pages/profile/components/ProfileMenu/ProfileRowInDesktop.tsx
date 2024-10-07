import { LabelContainer } from "@/components/styled-component/ProfileForms";
import { GreenGradientButton, OrangeGradientButton } from "@/components/UI/Button";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { FormWrapperExtend, ItemContainer, ItemInfo, ProfileItemContainer } from "./ProfileRowInMobile";



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

const ItemInfoDesktop = styled(ItemInfo)`
  font-size: 1.4rem;
  font-weight: bold;
`;

type Props = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInDesktop = ({ profileItem, handleClick }: Props) => {
  if (!profileItem) return null;

  const { label, status, buttonText, isVerified } = profileItem;
  if(profileItem.key === "changepassword") {
    return (
      <ItemContainer>
        <OrangeGradientButton onClick={() => {
          if (!profileItem) return;
          handleClick(profileItem);
        }}>
          {label}
        </OrangeGradientButton>
      </ItemContainer>
    );
  }
  else {
    return (
      <ProfileItemContainer>
        <ItemContainer style={{padding: "1.6rem 0", margin: 0}}>
          <LabelContainer >
            {label}
          </LabelContainer>
          <FormWrapperExtend style={{gap: "2.4rem", width: "calc(100% - 18rem)"}}>
            <ItemInfoDesktop>
              {status}
            </ItemInfoDesktop>
            {isVerified ? 
            <OrangeGradientButton style={{width: "11.6rem"}}  onClick={() => {
              if (!profileItem) return;
              handleClick(profileItem);
            }}>
              {buttonText}
            </OrangeGradientButton> : 
            <GreenGradientButton style={{width: "11.6rem"}}  onClick={() => {
              if (!profileItem) return;
              handleClick(profileItem);
            }}>
              {buttonText}
            </GreenGradientButton>
            }
            {/* <Button
              variant={isVerified ? "contained" : "outlined"}
              sx={{
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
            </Button>    */}
          </FormWrapperExtend>
          
        </ItemContainer>
        
      </ProfileItemContainer>
    );
  }
  
};

export default ProfileRowInDesktop;
