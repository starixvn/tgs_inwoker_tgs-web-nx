import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Dialog, DialogContent } from "@mui/material";
import { useHistory } from "react-router";
import PromotionContent from "./components/PromotionContent";

import closeImg from "@/assets/t31/images/promotion/IconClose.svg";

const StyledDialog = styled(Dialog)`
  width: 100%;
  & .MuiPaper-root {
    background: ${({ theme }) => theme.mainBackground};
    width: 100%;
    overflow: visible;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const PromotionDetail = () => {
  const { isMobileSize } = useRwd();
  const history = useHistory();
  const handleCloseDialog = () => {
    history.push("/promotion-list");
  };
  return (
    <div>
      {isMobileSize ? (
        <StyledDialog open={true} onClose={() => handleCloseDialog()}>
          <DialogContent>
            <CloseButton onClick={() => handleCloseDialog()}>
              <img width={30} height={30} src={closeImg} alt="close" />
            </CloseButton>
            <PromotionContent />
          </DialogContent>
        </StyledDialog>
      ) : (
        <PromotionContent />
      )}
    </div>
  );
};

export default PromotionDetail;
