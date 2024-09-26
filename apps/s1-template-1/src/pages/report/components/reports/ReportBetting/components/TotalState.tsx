import { CustomWinLose } from "@/components/styled-component/Report";
import { TableBody, TableCell, TableRow } from "@mui/material";
import config from "@tgs-web-nx/config";
import { RoundTotalDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";

type Props = {
  roundTotal: RoundTotalDto;
};

const TotalState = ({ roundTotal }: Props) => {
  const { betAmount, validBetAmount, winLoss } = roundTotal;
  return (
    config.features.Report_ShowRoundsTotal &&
    roundTotal && (
      <TableBody>
        <TableRow>
          <TableCell>
            <>{i18n.t("report.total")}</>
          </TableCell>
          <TableCell></TableCell>
          <TableCell align={"right"}>
            <> {betAmount}</>
          </TableCell>
          <TableCell align={"right"}>
            <CustomWinLose $value={roundTotal && winLoss}>{winLoss}</CustomWinLose>
          </TableCell>
          <TableCell align={"right"}></TableCell>
        </TableRow>
      </TableBody>
    )
  );
};

export default TotalState;
