import { media } from "@tgs-web-nx/constants";
import { GameTypeEnum, useWageringPage } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect } from "react";
import styled from "styled-components";

const WageringContainer = styled.div<{ $textColor?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ $textColor }) => ($textColor ? $textColor : "black")};
`;

type CardProps = {
  $cardBG?: string;
};

const Requirement = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $cardBG }) => $cardBG};
  width: 100%;
  height: 39px;
  padding: 10px 20px;
  gap: 10px;

  & > img {
    width: 19px;
    height: 21.56px;
    align-self: center;
  }
`;

const TitleItem = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;

const TitleAmountText = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
`;

const GameWageringContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  grid-row-gap: 15px;
  margin-top: 20px;
  ${media.sm} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GameCard = styled.div<CardProps>`
  background: ${({ $cardBG }) => $cardBG};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 62px;
  padding: 12px 20px;
  gap: 10px;
`;

const CardContent = styled.div`
  min-width: 100px;
  gap: 40px;
  align-items: center;
`;
const CaradText = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
`;

const CardAmount = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
`;

type WageringProps = {
  wageringImages: Record<GameTypeEnum, string>;
  mainBucketIcon: string;
  cardBG: string;
  textColor?: string;
};

const Wagering = (props: WageringProps) => {
  const { wageringRequirement, playerBuckets, fetchpPlayerBucket, activeType, setActiveType } =
    useWageringPage();

  useEffect(() => {
    fetchpPlayerBucket();
  }, [fetchpPlayerBucket]);

  return (
    <WageringContainer $textColor={props.textColor}>
      <Requirement $cardBG={props.cardBG}>
        <img width={30} height={30} src={props.mainBucketIcon} alt={"main"} />
        <TitleItem>{i18n.t("wagering.main")} </TitleItem>
        <TitleAmountText>{wageringRequirement}</TitleAmountText>
      </Requirement>
      <GameWageringContainer>
        {playerBuckets.map((bucket) => {
          if (bucket.key) {
            return (
              <GameCard
                $cardBG={props.cardBG}
                key={bucket.key}
                onMouseEnter={() => {
                  setActiveType(bucket.key);
                }}
                onMouseLeave={() => {
                  setActiveType("");
                }}
              >
                <img
                  width={25}
                  height={25}
                  src={props.wageringImages[bucket.key]}
                  alt={bucket.key}
                />
                <CardContent>
                  <CaradText>{bucket.lable}</CaradText>
                  <CardAmount>{bucket.amount}</CardAmount>
                </CardContent>
              </GameCard>
            );
          }
        })}
      </GameWageringContainer>
    </WageringContainer>
  );
};

export default Wagering;
