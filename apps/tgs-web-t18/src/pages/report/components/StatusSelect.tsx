import React from "react";
import styled from "styled-components";
import { FormControl } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { i18n } from "@tgs-web-nx/utils";
import { Select } from "@/components/UI/Select";
import { theme } from "@/theme";

const StatusSelectWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const StatusSelectContainer = styled.div`
  border: 1px solid ${theme.gray01};
  height: 47px;
  background: ${({ theme }) => theme.mainBackground};
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};
  border-radius: 6px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
  display: flex;
  align-items: center;
`;

const SelectLabel = styled.div`
  margin-right: 15px;
  color: ${({ theme }) => theme.text};
`;

const SelectFormControl = muiStyled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  "& fieldset": {
    border: "none",
  },
  "& select": {
    padding: 0,
    color: theme.palette.common.white,
    fontSize: "0.937rem",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.common.white,
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
        {/* <SelectFormControl variant="outlined"> */}
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
        {/* </SelectFormControl> */}
      </StatusSelectContainer>
    </StatusSelectWrapper>
  );
};

export default StatusSelect;
