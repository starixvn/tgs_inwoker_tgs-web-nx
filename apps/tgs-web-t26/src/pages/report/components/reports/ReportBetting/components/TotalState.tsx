import { RoundTotalDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { CustomWinLose } from "@/components/styled-component/Report";
import { theme } from "@/theme";

type Props = {
  roundTotal: RoundTotalDto;
};

const TotalState = ({ roundTotal }: Props) => {
  const { betAmount, validBetAmount, winLoss } = roundTotal;
  return (
    config.features.Report_ShowRoundsTotal &&
    roundTotal && (
      <TableBody sx={{ background: theme.mainBackground }}>
        <TableRow>
          <TableCell
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
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
            }}
          >
            <> {betAmount}</>
          </TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            <>{validBetAmount}</>
          </TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            <CustomWinLose $value={roundTotal && winLoss}>{winLoss}</CustomWinLose>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  );
};

export default TotalState;
