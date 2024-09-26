import { useContext } from "react";
import styled from "styled-components";

import { contextType, RewardContext } from "@tgs-web-nx/core/features";
import TitleIndicator from "./TitleIndicator";
import { i18n } from "@tgs-web-nx/utils";

const Title = styled.div<{ $titleColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;

  div:first-child {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme, $titleColor }) => $titleColor};
  }
  div:nth-child(2) {
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme, $titleColor }) => $titleColor};
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const Subtitle = (props: { subTitle: string }) => {
  const context = useContext(RewardContext) as contextType;
  const { titleColor } = context.colors;

  return (
    <Title $titleColor={titleColor}>
      <div>{props.subTitle}</div>
      <div>
        <TitleIndicator />
        <div>{i18n.t("reward.incompleteMilestones")}</div>
      </div>
    </Title>
  );
};

export default Subtitle;
