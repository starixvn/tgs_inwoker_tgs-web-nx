import iconArrow from "@/assets/t29/images/profile/icon-arrow.svg";
import Icon from "@/components/project/Icon";
import { ItemContainer, LabelContainer } from "@/components/styled-component/ProfileForms";
import { OrangeGradientButton } from "@/components/UI/Button";
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

const FormWrapperExtend = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VerifyButton = styled.span`
  position: absolute;
  right: .8rem;
  top: 1.6rem;
  color: #fff;
  font-size: 1.2rem;
`;

const ItemInfo = styled.div`
  font-size: 1.3rem;
  color: #fff;
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
  
  else {
    return (
      <ProfileItemContainer onClick={() => {
        if (!profileItem) return;
        handleClick(profileItem);
      }}>
        <ItemContainer style={{width: "100%", marginBottom: "1.2rem"}}>
          <LabelContainer>{label}</LabelContainer>
          <FormWrapperExtend>
            <ItemInfo>{profileItem.status}</ItemInfo>
            {/* <FormControl variant="outlined" >
              <TextField fullWidth disabled={true} value={profileItem.status}/>
            </FormControl> */}
            <Icon iconUrl={iconArrow} width={"20px"} height={"20px"} />
          </FormWrapperExtend>
         
         
          {/* <div className={"status"}>{status}</div> */}
        </ItemContainer>
  
        
      </ProfileItemContainer>
    );
  }
  
};

export default ProfileRowInMobile;
