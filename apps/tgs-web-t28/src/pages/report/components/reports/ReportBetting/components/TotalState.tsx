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
  const { betAmount, winLoss } = roundTotal;
  return (
    config.features.Report_ShowRoundsTotal &&
    roundTotal && (
      <TableBody sx={{ background: theme.mainBackground }}>
        <TableRow>
          <TableCell
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "unset",
            }}
          >
            <>{i18n.t("report.total")}</>
          </TableCell>
          <TableCell style={{ border: "unset" }}></TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "unset",
            }}
          >
            <> {betAmount}</>
          </TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "unset",
            }}
          >
            <CustomWinLose $value={roundTotal && winLoss}>{winLoss}</CustomWinLose>
          </TableCell>
          <TableCell
            align={"right"}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "unset",
            }}
          ></TableCell>
        </TableRow>
      </TableBody>
    )
  );
};

export default TotalState;
