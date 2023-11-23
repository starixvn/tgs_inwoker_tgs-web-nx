import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { ListItem, ListItemText, Modal } from "@mui/material";

export const AddCardContainer = styled.div`
  width: 100%;
`;

export const SubTitle = styled.div`
  display: none;
`;

export const BottomInfo = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.0025rem;
  text-align: center;
  color: ${({ theme }) => theme.gray50};
  margin-bottom: 20px;
`;
export const StyledModalBank = muiStyled(Modal)(({ theme }) => ({
  paper: {
    color: "#666666",
    padding: "0 30px",
    margin: 0,
    display: "block",
    position: "absolute",
    bottom: 0,
    height: "calc(100% - 580px)",
  },
}));

export const StyledListItem = muiStyled(ListItem)(({ theme }) => ({
  borderBottom: "1px solid rgba(0,0,0,0.2)",
  padding: "10px",
}));
export const StyledListItemText = muiStyled(ListItemText)(({ theme }) => ({
  textAlign: "center",
  paddingRight: "50px",
  "& .MuiTypography-root": {
    fontSize: "28px",
  },
}));
