import styled from 'styled-components';
import {cards} from '@/pages/home/components/Services/data';
import cardBg from '@/assets/t22/images/home/card.png';
import {theme} from '@/theme';

const Root = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Card = styled.div`
  padding: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${cardBg}) no-repeat center;
  background-size: cover;
  border-radius: 16px;
  max-width: 250px;
  width: 100%;
`;

const Icon = styled.img`
  width: 130px;
  aspect-ratio: 1;
`;

const Title = styled.p`
  font-size: .9rem;
  color: ${theme.defaultTab}
`;

const Content = styled.p`
  margin-top: 25px;
  font-size: .7rem;
  color: ${theme.white}
`;

const Cards = () => {
  return (
    <Root>
      {
        cards.map((card, i) => {
          return (
            <Card key={i}>
              <Icon src={card.icon} alt="icon"/>
              <Title>{card.title}</Title>
              <Content>{card.content}</Content>
            </Card>
          );
        })
      }
    </Root>
  );
};

export default Cards;
