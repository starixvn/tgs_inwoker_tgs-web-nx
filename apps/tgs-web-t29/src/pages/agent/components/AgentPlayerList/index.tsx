import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import {
  Button,
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TextField, Select } from "@mui/material";
import moment from "moment";
import PlayerInfoCard from "./Components/PlayerInfoCards";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const fakeData = {
  items: [
    {
      id: "018f8b81-7302-0000-0001-07e871937e08",
      playerName: "testFE1",
      currentLevel: 1,
      registeredTime: "2024-05-18T11:41:07.715302+00:00",
      latestLogin: "2024-05-18T11:41:07.715302+00:00",
      totalDeposit: 200,
      totalVaildBet: 400,
      status: "qwe",
    },
  ],
  totalcount: 21,
};

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const PlayerList = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.1px;
`;

const AgentPlayerList = () => {
  const { isDesktopSize } = useRwd();

  return (
    <>
      <FilterContainer>
        <TextField
          // value={subject}
          // onChange={updateSubject}
          placeholder={i18n.t("agent.playerName")}
          sx={{
            input: {
              width: "400px",
            },
          }}
        />
        <Select defaultValue={"status"} sx={{ width: "200px" }}>
          <MenuItem value={"status"}>{i18n.t("agent.status")} </MenuItem>
          <MenuItem value={"enabled"}>{i18n.t("agent.enabled")} </MenuItem>
          <MenuItem value={"disabled"}>{i18n.t("agent.disabled")} </MenuItem>
          <MenuItem value={"inBlacklist"}>{i18n.t("agent.inBlacklist")} </MenuItem>
        </Select>
        {isDesktopSize && (
          <Button
            variant={"outlined"}
            sx={{
              width: "100px",
              color: theme.white,
              background: theme.primary,
              "&:hover": {
                color: theme.white,
                background: theme.primary,
              },
            }}
          >
            {i18n.t("common.search")}
          </Button>
        )}
      </FilterContainer>
      <PlayerList>
        {isDesktopSize ? (
          <Table>
            <TableHead>
              <TableRow sx={{ background: theme.blue10 }}>
                <TableCell>{i18n.t("agent.playerName")}</TableCell>
                <TableCell>{i18n.t("agent.vipLevel")}</TableCell>
                <TableCell>{i18n.t("agent.registeredTime")}</TableCell>
                <TableCell>{i18n.t("agent.latestLogin")}</TableCell>
                <TableCell>{i18n.t("vip.totalDeposit")}</TableCell>
                <TableCell>{i18n.t("vip.totalVaildBet")}</TableCell>
                <TableCell>{i18n.t("agent.status")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeData.items.map((transactionDetail) => {
                const {
                  id,
                  playerName,
                  currentLevel,
                  registeredTime,
                  latestLogin,
                  totalDeposit,
                  totalVaildBet,
                  status,
                } = transactionDetail;

                const registerData = moment(registeredTime).format("YYYY-MM-DD hh:mm a");
                const latestLoginData = moment(latestLogin).format("YYYY-MM-DD hh:mm a");
                return (
                  <TableRow key={id}>
                    <TableCell>{playerName}</TableCell>
                    <TableCell>{currentLevel}</TableCell>
                    <TableCell>{registerData}</TableCell>
                    <TableCell>{latestLoginData}</TableCell>
                    <TableCell>{totalDeposit}</TableCell>
                    <TableCell>{totalVaildBet}</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <PlayerInfoCard />
        )}
        {isDesktopSize && (
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={100}
            rowsPerPage={20}
            page={1}
            onPageChange={() => {}}
            sx={{
              width: "100%",
              color: theme.blue40,
              "& button": {},
            }}
          />
        )}
      </PlayerList>
    </>
  );
};

export default AgentPlayerList;
