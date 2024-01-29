import styled from 'styled-components';
import titleBg from "@/assets/t22/images/home/service.png";

import Badges from '@/pages/home/components/Services/Badges';
import Cards from '@/pages/home/components/Services/Cards';

const Root = styled.div`
  margin-bottom: 80px;
  width: 100%;
`;

const Title = styled.img`
  margin: 0 auto;
  display: block;
  max-width: 1000px;
  width: 100%;
`;

const Services = () => {
  return (
    <Root>
      <Title src={titleBg} alt="services"/>

      {/* badge */}
      <Badges/>

      {/* cards */}
      <Cards/>
    </Root>
  );
};

export default Services;
