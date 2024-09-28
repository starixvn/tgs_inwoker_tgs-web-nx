import Icon from "@/components/project/Icon";
import { LabelContainer } from "@/components/styled-component/ProfileForms";
import { OrangeGradientButton } from "@/components/UI/Button";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";

export const ProfileItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:last-child {
    > div {
     border-bottom: none;
    }
  }

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

  &:last-child {
    border-bottom: none;
  }
`;

export const FormWrapperExtend = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

export const ItemInfo = styled.div`
  font-size: 1.3rem;
  color: #fff;
  color: ${({ theme }) => theme.placeHolderText}
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2A343F;
  margin-bottom: 1.2rem;
  padding: .6rem 0;
  width: 100%;
  marginBottom: 1.2rem;
  display: flex;
  min-height: 4.8rem;
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
      <ProfileItemContainer onClick={() => {
        if (!profileItem) return;
        handleClick(profileItem);
      }}>
        <ItemContainer >
          <LabelContainer>{label}</LabelContainer>
          <FormWrapperExtend>
            <ItemInfo>{profileItem.status}</ItemInfo>
            {/* <FormControl variant="outlined" >
              <TextField fullWidth disabled={true} value={profileItem.status}/>
            </FormControl> */}
            <Icon iconUrl="/assets/images/common/icon-view-all.svg" width={"13px"} height={"19px"} />
          </FormWrapperExtend>
         
         
          {/* <div className={"status"}>{status}</div> */}
        </ItemContainer>        
      </ProfileItemContainer>
    );
  }
  
};

export default ProfileRowInMobile;
