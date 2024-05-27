import { useAgentPage, useRwd, PlayerStatus } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import {
  Button,
  MenuItem,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TextField, Select } from "@mui/material";
import moment from "moment";
import { UserConfig, PlayerList as PlayerListService } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AgentButton } from "../AgentButton";
import PlayerInfoCards from "./Components/PlayerInfoCards";
import { theme } from "@/theme";
import LoadingBlock from "@/components/project/LoadingBlock";

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

const NoData = styled.div`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid rgba(83, 88, 103, 0.3);
`;

const AgentPlayerList = () => {
  const { isDesktopSize } = useRwd();
  const [userName, setUserName] = useState("");
  const [userStatus, setUserStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { getStatusTranslation } = useAgentPage();

  const config: UserConfig = {
    username: userName,
    status: userStatus === "all" ? "" : userStatus,
    page: page,
  };

  const { getPlayerList, queryKey } = PlayerListService(config);

  const { refetch, data, isSuccess, isFetching } = useQuery({
    queryKey,
    queryFn: getPlayerList,
    enabled: false,
  });
  const hasData = data && data.data.items.length > 0;

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setTotalCount(data.data.totalCount);
    }
  }, [data]);

  const handleSelectStatus = (event: SelectChangeEvent) => {
    setUserStatus(event.target.value);
  };

  const handleChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleOnSearch = async () => {
    await setPage(1);
    refetch();
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
    refetch();
  };

  return (
    <>
      <FilterContainer>
        <TextField
          value={userName}
          onChange={handleChangeUserName}
          placeholder={i18n.t("usertype.player")}
          sx={{
            input: {
              width: isDesktopSize ? "400px" : "300px",
            },
          }}
        />
        <Select value={userStatus} sx={{ width: "200px" }} onChange={handleSelectStatus}>
          <MenuItem value={"all"}>{i18n.t("agent.status")} </MenuItem>
          <MenuItem value={PlayerStatus.ENABLED}>{i18n.t("agent.enabled")} </MenuItem>
          <MenuItem value={PlayerStatus.DISABLED}>{i18n.t("agent.disabled")} </MenuItem>
          <MenuItem value={PlayerStatus.INBLACKLIST}>{i18n.t("agent.inBlacklist")} </MenuItem>
        </Select>
        {isDesktopSize && (
          <AgentButton>
            {i18n.t("common.search")}
          </AgentButton>
        )}
      </FilterContainer>
      <PlayerList>
        {isDesktopSize ? (
          <Table>
            <TableHead>
              <TableRow sx={{ background: theme.blue10 }}>
                <TableCell>{i18n.t("usertype.player")}</TableCell>
                <TableCell>{i18n.t("agent.vipLevel")}</TableCell>
                <TableCell>{i18n.t("agent.registeredTime")}</TableCell>
                <TableCell>{i18n.t("agent.latestLogin")}</TableCell>
                <TableCell>{i18n.t("vip.totalDeposit")}</TableCell>
                <TableCell>{i18n.t("vip.totalVaildBet")}</TableCell>
                <TableCell>{i18n.t("agent.status")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <LoadingBlock size={30} style={{ margin: "10px 0" }} />
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.items
                  .filter((player) => player.playerStatus !== PlayerStatus.REGISTERING)
                  .map((player, index) => {
                    const registerData = moment(player.registeredOn).format("YYYY-MM-DD hh:mm a");
                    const latestLoginData = moment(player.lastLoginOn).format("YYYY-MM-DD hh:mm a");
                    return (
                      <TableRow key={index}>
                        <TableCell>{player.playerUsername}</TableCell>
                        <TableCell>{player.vipLevel}</TableCell>
                        <TableCell sx={{ width: "120px" }}>{registerData}</TableCell>
                        <TableCell sx={{ width: "120px" }}>{latestLoginData}</TableCell>
                        <TableCell>{player.totalDepositAmount}</TableCell>
                        <TableCell>{player.totalWithdrawAmount}</TableCell>
                        <TableCell>{getStatusTranslation(player.playerStatus)}</TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        ) : (
          <PlayerInfoCards />
        )}
        {!isFetching && !hasData && <NoData>{i18n.t("common.nodata")}</NoData>}
        {isSuccess && isDesktopSize && (
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={totalCount}
            rowsPerPage={20}
            page={page - 1}
            onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
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
