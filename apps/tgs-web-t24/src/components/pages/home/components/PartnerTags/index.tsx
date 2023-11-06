import { media } from '@/theme/breakpoints';
import styled from 'styled-components';

const PartnersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PartnerBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 12px 32px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 400;

  ${media.md} {
    padding: 10px 20px;
  }
`;

const PartnerList = [
  "Red Tiger",
  "EVOLUTION",
  "SV388",
  "Saba Sports",
  "BTi",
  "365 Cards",
  "PG Soft",
  "KY",
];

const PartnerTags = () => {
  return (
    <PartnersContainer>
      {PartnerList.map((partner) => {
        return <PartnerBadge key={partner}>{partner}</PartnerBadge>;
      })}
    </PartnersContainer>
  );
};

export default PartnerTags;
