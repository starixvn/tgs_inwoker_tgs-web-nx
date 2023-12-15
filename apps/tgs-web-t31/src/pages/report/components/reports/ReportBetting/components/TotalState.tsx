import { RoundTotalDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { CustomWinLose } from "@/components/styled-component/Report";

type Props = {
  roundTotal: RoundTotalDto;
};

const TotalState = ({ roundTotal }: Props) => {
  const { betAmount, validBetAmount, winLoss } = roundTotal;
  return (
    <>
      {config.features.Report_ShowRoundsTotal && roundTotal && (
        <TableBody>
          <TableRow>
            <TableCell
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "#161616",
              }}
            >
              <>{i18n.t("report.total")}</>
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#161616",
              }}
            ></TableCell>
            <TableCell
              style={{
                backgroundColor: "#161616",
              }}
            ></TableCell>
            <TableCell
              align={"right"}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "#161616",
              }}
            >
              <> {betAmount}</>
            </TableCell>
            <TableCell
              align={"right"}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "#161616",
              }}
            >
              <>{validBetAmount}</>
            </TableCell>
            <TableCell
              align={"right"}
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "#161616",
              }}
            >
              <CustomWinLose $value={roundTotal && winLoss}>{winLoss}</CustomWinLose>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </>
  );
};

export default TotalState;
