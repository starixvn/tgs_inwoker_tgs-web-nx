import { FormControl, ItemContainer, LabelContainer } from "@/components/styled-component/ProfileForms";
import { GreenGradientButton, OrangeGradientButton } from "@/components/UI/Button";
import { TextField } from "@/components/UI/TextField";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";

const ProfileItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  & .label {
    color: ${({ theme }) => theme.text};
    font-size: 1.25rem;
    font-weight: 400;
  }

  & .status {
    color: ${({ theme }) => theme.black};
    font-size: 0.937rem;
    font-weight: 400;
  }

  & svg {
    color: ${({ theme }) => theme.white} !important;
  }
`;

const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 10rem;
  grid-column-gap: 1.2rem;
  align-items: center;
`;

type ProfileItemProps = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInMobile = ({ profileItem, handleClick }: ProfileItemProps) => {
  if (!profileItem) return null;

  const { label, status } = profileItem;
  if(profileItem.key === "changepassword") {
    return (
      <OrangeGradientButton onClick={() => {
        if (!profileItem) return;
        handleClick(profileItem);
      }}>
        {label}
      </OrangeGradientButton>
      
    );
  }
  else if(profileItem.key === "name" || profileItem.key === "email") {
    return (
      <ProfileItemContainer
        onClick={() => {
          if (!profileItem) return;
          handleClick(profileItem);
        }}
      >
        <ItemContainer style={{width: "100%", marginBottom: "1.2rem"}}>
          <LabelContainer>{label}</LabelContainer>
          <FormControl variant="outlined" >
            <TextField fullWidth />
          </FormControl>
         
          {/* <div className={"status"}>{status}</div> */}
        </ItemContainer>
  
        {/* <Icon iconUrl={iconArrow} width={"20px"} height={"20px"} /> */}
      </ProfileItemContainer>
    );
  }
  else {
    return (
      <ProfileItemContainer>
        <ItemContainer style={{width: "100%", marginBottom: "1.2rem"}}>
          <LabelContainer>{label}</LabelContainer>
          <FormWrapper>
            <FormControl variant="outlined" >
              <TextField />
            </FormControl>
            <GreenGradientButton onClick={() => {
              if (!profileItem) return;
              handleClick(profileItem);
            }}>Save</GreenGradientButton>
          </FormWrapper>
          
          {/* <div className={"status"}>{status}</div> */}
        </ItemContainer>
  
        {/* <Icon iconUrl={iconArrow} width={"20px"} height={"20px"} /> */}
      </ProfileItemContainer>
    );
  }

  
};

export default ProfileRowInMobile;
