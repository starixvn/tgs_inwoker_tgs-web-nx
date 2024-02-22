import React from "react";
import styled from "styled-components";
import { FormControl, styled as muiStyled } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { Select } from "@/components/UI/Select";

const StatusSelectContainer = styled.div`
  padding: 1px 29px;
  background: ${({ theme }) => theme.tertiaryDark};
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SelectLabel = styled.div`
  margin-right: 80px;
`;

const SelectFormControl = muiStyled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  "& fieldset": {
    border: "none",
  },
  "& select": {
    padding: 0,
    color: theme.palette.white,
    fontSize: "0.937rem",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.white,
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
    <StatusSelectContainer>
      <SelectLabel>{i18n.t("report.status")}</SelectLabel>

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
  );
};

export default StatusSelect;
