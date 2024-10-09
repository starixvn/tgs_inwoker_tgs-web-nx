import Icon from "@/components/project/Icon";
import { LabelContainer } from "@/components/styled-component/ProfileForms";
import { OrangeGradientButton } from "@/components/UI/Button";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { ProfileItem } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled, { css } from "styled-components";

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
  justify-self: flex-end;
  ${media.sm} {
    display: grid;
    grid-template-columns: 1fr 11.6rem;
    grid-gap-column: 1rem;
  }
`;

type StatusInfo = {
  isVerified: boolean, 
  theme: typeof theme
};
export const ItemInfo = styled.div<StatusInfo>`
  font-size: 1.3rem;
  color: #fff;
  color: ${({ isVerified, theme }: StatusInfo) => {
    return isVerified ? theme.text : theme.placeHolderText;
   }};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: .4rem;
 
  ${media.sm} {
    gap: .8rem;
    align-items: center;
    flex-direction: row;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #2A343F;
  margin-bottom: 1.2rem;
  padding: .6rem 0;
  width: 100%;
  marginBottom: 1.2rem;
  min-height: 4.8rem;
  justify-content: space-between;
  gap: 1.2rem;
`;

const LabelStatusBase = styled.div`
   font-size: 1.3rem;
   padding: .4rem .6rem;
   border-radius: .8rem;
   font-weight: 600;
   line-height: 2rem;
   letter-spacing: 0.26px;
`;

export const ProfileLabelContainer = styled(LabelContainer)`
   float: unset;
   justify-self: start;
   margin-bottom: 0;
   white-space: nowrap;
`;

export const StatusName = styled.div`
  word-break: break-word;

`;

 
type LabelStatusProps = {
  status: string,
  theme: typeof theme
};
export const LabelStatus = styled(LabelStatusBase)<LabelStatusProps>`
  ${({ status, theme }: LabelStatusProps) => {    
    switch(status) {
      case "yes": 
        return css`
          background-color: ${theme.verifiedLabelBackground};
          color: ${theme.verifiedLabelColor};         
          }
        `;
      case "verifying": 
        return css`
        background-color: ${theme.verifyingLabelBackground};
        color: ${theme.verifyingLabelColor};         
        }
      `;
      case "rejected": 
        return css`
        background-color: ${theme.rejectedLabelBackground};
        color: ${theme.rejectedLabelColor};         
        }
      `;
    }
  }}
`;

type ProfileItemProps = {
  profileItem?: ProfileItem;
  handleClick: (newProfileItem: ProfileItem) => void;
};

const ProfileRowInMobile = ({ profileItem, handleClick }: ProfileItemProps) => {
  if (!profileItem) return null;

  const { label, status, currentFormStatus } = profileItem;
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
          <ProfileLabelContainer>{label}</ProfileLabelContainer>
          <FormWrapperExtend>
            <ItemInfo isVerified={profileItem.isVerified || false}>
            <StatusName>{profileItem.status}</StatusName>
            {(!!currentFormStatus) && <LabelStatus status={currentFormStatus}>{i18n.t("verified." + currentFormStatus)}</LabelStatus>}
            </ItemInfo>
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
