import { styled as muiStyled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import { ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";
import limitBg from "@/assets/t29/images/withdraw/limit-bg.png";
import {
  FormControl as ProfileFormControl,
  ItemContainer as ProfileItemContainer,
} from "@/components/styled-component/ProfileForms";
import { media } from "@/theme/breakpoints";

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
  align-self: flex-start;
  margin-top: 10px;
`;
export const ItemContainer = styled(ProfileItemContainer)`
  ${media.sm} {
    max-width: none;
  }
`;
export const FormControl = styled(ProfileFormControl)`
  max-width: 500px;
`;
export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & input {
    padding: 16px 0 !important;
  }
`;
export const LimitPopupContainer = styled.div`
  white-space: nowrap;
  background: url(${limitBg}) no-repeat;
  background-size: contain;
  background-position: center;
  font-size: 0.812rem;
  color: ${({ theme }) => theme.white};
  padding: 10px 24px;
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
`;
export const Turnover = styled.div`
  color: ${({ theme }) => theme.text};
  span {
    margin-left: 5px;
    color: ${({ theme }) => theme.secondary};
    font-weight: bold;
  }
`;
export const ButtonWrapper = styled.div`
  margin: 0 0 0 0;
  display: flex;
`;
export const GameWalletButton = styled.div`
  font-size: 12px;
  background: ${({ theme }) => {
    return theme.primary;
  }};
  width: fit-content;

  text-align: center;
  padding: 5px;

  margin: 8px 5px 0 0;
  color: #fff;

  min-width: 79px;
  height: 28px;
  border-radius: 5px;
  border: solid 1px #ffffff;

  &:hover {
    cursor: pointer;
    background-blend-mode: screen, normal;
    ${(props) =>
      props.disabled
        ? "   background-image: linear-gradient(to top, #797979, #c3c3c3);"
        : " box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;
export const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
`;
export const USDTWrapper = styled.div``;
export const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
