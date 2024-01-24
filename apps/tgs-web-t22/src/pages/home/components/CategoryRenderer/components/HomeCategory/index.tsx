import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import WinnerCard from "../../../WinnerCard";
import { useBettingHistory } from "../../../Ranking/hooks/useBettingHistory";
import useHomeCategoryList from "@/hooks/home/useHomeCategoryList";
import labelBg from "@/assets/t22/images/home/label.png";
import { media } from "@/theme/breakpoints";
import Download from '@/pages/home/components/Download';
import Services from '@/pages/home/components/Services';



const Image = styled.div<{ $imageUrl: string }>`
  width: 100%;
  aspect-ratio: 275 / 355;
  background: url(${({ $imageUrl }) => $imageUrl}) center no-repeat;
  background-size: cover;
`;

const Label = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  aspect-ratio: 275 / 90;
  background: url(${labelBg}) center no-repeat;
  background-size: cover;
`;

const Icon = styled(Image)`
  width: 45px;
  aspect-ratio: 1;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 6px;
`;

const Title = styled.p`
  color: ${({theme}) => theme.black };
  font-size: 0.9rem;
  text-align: center;
`;

const SubTitle = styled.p`
  color: ${({theme}) => theme.labelText };
  font-size: 0.6rem;
  text-align: center;
  text-transform: uppercase;
`;

const Card = styled.div`
  cursor: pointer;
`;

const Container = styled.div`
  margin: 40px auto 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 100%;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;



type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

const HomeCategory = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const homeCategoryList = useHomeCategoryList();
  const { leaderboard } = useBettingHistory();
  const handleClick = (gameTypeItem: GameTypeItem) => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  if (isDesktopSize) {
    return (
      <>
        {/* category cards */}
        <Container>
          {homeCategoryList.map((item) => {
            return (
              <Card key={item.key} onClick={() => handleClick(item)}>
                <Image $imageUrl={item.imgUrl} />
                <Label>
                  <Icon $imageUrl={item.icon} />
                  <Desc>
                    <Title>{item.text}</Title>
                    <SubTitle>{item.subTitle}</SubTitle>
                  </Desc>
                </Label>
              </Card>
            );
          })}
        </Container>

        {/* ranking */}
        <WinnerCard leaderboard={leaderboard}/>

        {/* download */}
        <Download />

        {/* quality services */}
        <Services />
      </>
    );
  }
};

export default HomeCategory;
