import { CloseIcon } from "@/components/UI/CustomizeIcon";
import styled from "styled-components";

const PopupHeaderContainer = styled.div`

`;



type Props = {
  title: string;
  handleClose: () => void;
};
const PopupHeader = ({ title, handleClose }: Props) => {
  return (
    <PopupHeaderContainer>
        <CloseIcon
          sx={{
            position: "absolute",
            top: "1.9rem",
            right: "2.4rem !important",
            width: "3.2rem",
            height: "3.2rem",
            color: "#324354",
            zIndex: "4",
            cursor: "pointer",
            "&:hover": {
              color: "#6F7E93",
            },
          }}
          viewBox="0 0 33 32"
          className="icon-close"
          onClick={handleClose}
        />
    </PopupHeaderContainer>
  );
};

export default PopupHeader;
