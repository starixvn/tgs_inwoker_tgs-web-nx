import { Select } from "@/components/UI/Select";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { MenuItem } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const StatusSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 1.2rem;
  width: 100%;
  ${media.sm} {
    width: 23rem;
  }
`;

const StatusSelectContainer = styled.div`
  color: ${({ theme }) => theme.white};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
 
`;

const SelectLabel = styled.div`
  margin-right: 5px;
  margin-bottom: .6rem;
  color: ${({ theme }) => theme.noDataTextColor};
  font-size: 1.4rem;
  font-weight: 700;
`;

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
