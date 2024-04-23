import styled from "styled-components";
import { Close as CloseIcon } from "@mui/icons-material";
import { useHeader } from "@tgs-web-nx/core/features";
import { useGeneralStore } from "@tgs-web-nx/core";
import { theme } from "@/theme";

const SideMenuHeaderContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 66px;
`;

const CloseIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 54px;
`;

const SideMenuHeader = () => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { handleToggleMenu } = useHeader();

  return (
    <SideMenuHeaderContainer>
      <CloseIconContainer onClick={() => handleToggleMenu(false)}>
        <CloseIcon
          style={{
            color: theme.white,
            width: "24px",
            height: "24px",
          }}
        />
      </CloseIconContainer>
      <LogoImg src={brand && brand.loadingUrl} />
    </SideMenuHeaderContainer>
  );
};

export default SideMenuHeader;
