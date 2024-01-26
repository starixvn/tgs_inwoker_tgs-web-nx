import styled from 'styled-components';
import badgeBg from '@/assets/t22/images/home/badge.png';
import {badges} from '@/pages/home/components/Services/data';
import {theme} from '@/theme';

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 250px;
  width: 100%;
`;

const Value = styled.p`
  font-size: 1.5rem;
  color: ${theme.white}
`;

const Unit = styled.span`
  display: block;
  color: #A08F7D;
  font-size: .6rem;
`;

const Circle = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${badgeBg}) no-repeat center;
  background-size: cover;
  max-width: 130px;
  width: 100%;
  aspect-ratio: 1;
`;

const BadgeDesc = styled.p`
  margin-top: 20px;
  color: #EDD9C6;
  font-size: .9rem;
  text-transform: uppercase;
  text-align: center;
`;

const Root = styled.div`
  margin-top: 55px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Badges = () => {
  return (
    <Root>
      {
        badges.map((badge, i) => {
          return (
            <Badge key={i}>
              <Circle>
                <Value>{badge.value}</Value>
                <Unit>{badge.unit}</Unit>
              </Circle>
              <BadgeDesc>{badge.text}</BadgeDesc>
            </Badge>
          );
        })
      }
    </Root>
  );
};

export default Badges;
