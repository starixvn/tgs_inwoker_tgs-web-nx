import React from "react";
import styled from "styled-components";
import { FormControl, styled as muiStyled } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { Select } from "@/components/UI/Select";

const StatusSelectWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const StatusSelectContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.white};
  height: 40px;
  background: transparent;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};
  border-radius: 6px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
  display: flex;
  align-items: center;
`;

const SelectLabel = styled.div`
  margin-right: 10px;
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 400;
`;

const SelectFormControl = muiStyled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  padding: 0,

  "&:before": {
    top: "1px",
    right: "36px",
    height: "100%",
    content: "''",
    display: "block",
    zIndex: "2",
    position: "absolute",
    borderRight: "1px solid #D6DBDD",
  },
  "& fieldset": {
    border: "none",
  },
  "& select": {
    color: theme.palette.white,
    fontSize: "0.937rem",
    height: "100% !important",
    padding: "5px",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary,
  },
  "& .MuiFormControl-root": {
    height: "100%",
  },
  "& .MuiOutlinedInput-root-MuiSelect-root": {
    height: "100%",
  },
}));

export interface StatusDictionary {
  [key: string]: string | null;
}

type Props = {
  statusDictionary: StatusDictionary;
  handleStatusChange: (e: any) => void;
  status: string;
  type?: string;
};
const StatusSelect = ({ statusDictionary, handleStatusChange, status, type }: Props) => {
  return (
    <StatusSelectWrapper>
      <SelectLabel>{i18n.t("report.status")}</SelectLabel>
      <StatusSelectContainer>
        <SelectFormControl variant="outlined">
          <Select native onChange={handleStatusChange} value={status} fullWidth>
            <option value={""}>{i18n.t("report.all")}</option>

            {Object.keys(statusDictionary).map((key) => {
              return (
                <option key={key} value={key}>
                  {i18n.t(`report.${type}.status${key}`)}
                </option>
              );
            })}
          </Select>
        </SelectFormControl>
      </StatusSelectContainer>
    </StatusSelectWrapper>
  );
};

export default StatusSelect;
