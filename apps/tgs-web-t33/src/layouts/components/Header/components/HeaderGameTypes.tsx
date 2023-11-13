import React, { useMemo } from "react";
import { GameTypeItem } from "@tgs-web-nx/core/features";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import styled from "styled-components";
import useGameTypeList from "@/hooks/home/useGameTypeList";

const HeaderGameTypesContainer = styled.div`
  margin-right: auto;
`;

type Props = {};
const HeaderGameTypes = (props: Props) => {
  const gameTypeList = useGameTypeList();

  const displayedGameTypeList = useMemo(() => {
    const gameTypes: GameTypeItem[] = [];

    for (const gameTypeItem of gameTypeList) {
      if (gameTypeItem.key === GameTypeEnum.NONE) continue;

      gameTypes.push(gameTypeItem);
    }

    return gameTypes;
  }, [gameTypeList]);

  console.log(displayedGameTypeList);
  return <HeaderGameTypesContainer>YOYO</HeaderGameTypesContainer>;
};

export default React.memo(HeaderGameTypes);
