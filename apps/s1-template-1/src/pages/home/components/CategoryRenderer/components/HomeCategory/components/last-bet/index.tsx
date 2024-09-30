import { HubConnection } from "@microsoft/signalr";
import { useGameTypeList } from "@tgs-web-nx/core/features";
import { LastBetDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import React, { useEffect, useState } from "react";

import LastBetsTable from "./LastBetsTable";
import { TableContainer, TableHeader } from "./style";

interface LastBetsType {
  connection: HubConnection | undefined;
}

const LastBets: React.FC<LastBetsType> = (props: LastBetsType) => {
  const { connection } = props;
  const [betList, setBetList] = useState<LastBetDto[]>([]);
  const navGameType = useGameTypeList();
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (!connection) return;

    connection.start().catch((err) => console.error(err.toString()));

    connection.on("ReceiveLastBet", (item: LastBetDto) => {
      setBetList((items) => {
        item.gameIconUrl = navGameType.find((x) => x.gameType === item.gameType)?.iconUrl || "";
        const updatedMessages = [item, ...items];
        if (items !== updatedMessages) {
          setStartAnimation(true);
        } else {
          setStartAnimation(false);
        }
        return updatedMessages;
      });
    });

    return () => {
      connection.off("ReceiveLastBet");
      connection.stop();
      setStartAnimation(false);
    };
  }, [connection]);

  return (
    <TableContainer>
      <TableHeader>
        <span>{i18n.t("web.latestBets.game")}</span>
        <span>{i18n.t("web.latestBets.user")}</span>
        <span>{i18n.t("web.latestBets.multiplier")}</span>
        <span className="text-right">{i18n.t("web.latestBets.payout")}</span>
      </TableHeader>
      <LastBetsTable startAnimation={startAnimation} betList={betList} />
    </TableContainer>
  );
};

export default LastBets;
