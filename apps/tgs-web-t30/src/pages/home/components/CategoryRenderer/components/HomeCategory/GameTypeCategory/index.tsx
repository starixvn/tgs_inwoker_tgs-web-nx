import React from "react";
import { GameTypeItem } from "@tgs-web-nx/core/features";

type Props = {
  gameTypeItem: GameTypeItem;
};
const GameTypeCategory = ({ gameTypeItem }: Props) => {
  console.log(gameTypeItem);
  return <div>{gameTypeItem.text}</div>;
};

export default React.memo(GameTypeCategory);
