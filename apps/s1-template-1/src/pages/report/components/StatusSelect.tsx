import { Select } from "@/components/UI/Select";
import { theme } from "@/theme";
import { FormControl, MenuItem, styled as muiStyled } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const StatusSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

const StatusSelectContainer = styled.div`
  color: ${({ theme }) => theme.white};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  width: 23rem;
 
`;

const SelectLabel = styled.div`
  margin-right: 5px;
  color: ${({ theme }) => theme.text};
`;

const SelectFormControl = muiStyled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  padding: 0,

  "&:before": {
    top: "1px",
    right: "36px",
    height: "100%",
    content: "'\x00'",
    display: "block",
    zIndex: "2",
    position: "absolute",
    borderRight: "1px solid #D6DBDD",
  },
  "& fieldset": {
    border: "none",
  },
  "& select": {
    padding: 0,
    color: theme.palette.white,
    fontSize: "0.937rem",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary,
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
        <Select sx={{height: "3.6rem", background: theme.dropDownBackground, border: "none"}}  onChange={handleStatusChange} value={status} fullWidth>
          <MenuItem value={""}>{i18n.t("report.all")}</MenuItem>

          {Object.keys(statusDictionary).map((key) => {
            return (
              <MenuItem key={key} value={key}>
                {i18n.t(`report.${type}.status${key}`)}
              </MenuItem>
            );
          })}
        </Select>
        {/* </SelectFormControl> */}
        
      </StatusSelectContainer>
    </StatusSelectWrapper>
  );
};

export default StatusSelect;
