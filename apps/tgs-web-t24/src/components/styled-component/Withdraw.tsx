import { styled as muiStyled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";

export const StyledModalBank = muiStyled(Modal)(({ theme }) => ({
  "& .MuiModal-paper": {
    color: "#666666",
    padding: "0 30px",
    width: "750px",
    maxWidth: "750px",
    margin: 0,
    display: "block",
    position: "absolute",
    bottom: 0,
    height: "calc(100% - 580px)",
  },
}));

export const StyledListItem = muiStyled(ListItem)(({ theme }) => ({
  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
  padding: "10px",
}));

const StyledListItemText = muiStyled(ListItemText)(({ theme }) => ({
  textAlign: "center",
  paddingRight: "50px",
  "& .MuiTypography-root": {
    fontSize: "28px",
  },
}));

export const LeftText = styled(StyledListItemText)`
  text-align: left;
`;
export const RightText = styled(StyledListItemText)`
  text-align: right;
`;

export const StyledModalPopup = muiStyled(Modal)(({ theme }) => ({
  "& .MuiModal-paper": {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",
    display: "block",
  },
}));

export const ManageBankCardButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  max-width: 450px;
  align-self: flex-start;
  margin-top: 10px;
`;
