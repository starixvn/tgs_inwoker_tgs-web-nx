import { RoundTotalDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { TableBody, TableCell, TableRow } from "@mui/material";
import {
  CustomWinLose
} from "@/components/styled-component/Report";
import { theme } from "@/theme";

type Props = {
  roundTotal: RoundTotalDto;
};

const TotalState = ({ roundTotal }: Props) => {
  const { betAmount, validBetAmount, winLoss } = roundTotal;
  return (
    <>{config.features.Report_ShowRoundsTotal &&
      roundTotal &&
      <TableBody>
        <TableRow sx={{ background: theme.pureBlack, borderRadius: "10px", height: "37px" }}>
          <TableCell
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "10px 12px",
            }}
          >
            <>{i18n.t("report.total")}</>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "10px 12px",
            }}
          >
            <> {betAmount}</>
          </TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "10px 12px",
            }}
          >
            <>{validBetAmount}</>
          </TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "10px 12px",
            }}
          >
            <CustomWinLose $value={roundTotal && winLoss}>
              {winLoss}
            </CustomWinLose>
          </TableCell>
        </TableRow>
      </TableBody>
    }
    </>
  );
};

export default TotalState;
