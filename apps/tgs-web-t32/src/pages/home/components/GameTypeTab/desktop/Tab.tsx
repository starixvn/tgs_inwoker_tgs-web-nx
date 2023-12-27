import styled from "styled-components";

type Props = {
  text: string;
  content: string;
  bgUrl: string;
  onClick: () => void;
  iconUrl: string;
};

const Wrapper = styled.div<{
  $bgUrl: string;
}>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(18% - 10px);
  aspect-ratio: 309 / 503;
  padding: 20px 24px 10px 24px;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
  margin-right: 10px;
  border-radius: 4px;

  & :hover {
    color: ${({ theme }) => theme.white};
  }
`;

const VendorNameInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

const GameTypeLogo = styled.div<{ $iconUrl: string }>`
  width: 150px;
height: 60px;
  background-image: url(${({ $iconUrl }) => $iconUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const PlayBtn = styled.div`
  width: 100%;
  min-height: 36px;
  padding: 7px 12px;
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ theme }) => theme.btnPri};
  
  &:hover {
    box-shadow: 0 -5px 15px 0 #34c75cc9;
    padding: 10px 12px;
    }
`;

const GameType = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Content = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 12.14px;
  font-weight: 400;
  text-shadow: 0px 0px 0px #000, 1px 0px 0px #000, 0px 1px 0px #000, 0px 0px 0px #000;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: center;
`;

const DesktopVendorTab = ({
  text,
  content,
  bgUrl,
  onClick,
  iconUrl,
}: Props) => {

  return (
    <Wrapper $bgUrl={bgUrl}>
      <VendorNameInfo>
        <GameTypeLogo $iconUrl={iconUrl}></GameTypeLogo>
        <GameType>{text}</GameType>
        <Content>{content}</Content>
      </VendorNameInfo>
      <PlayBtn onClick={onClick}>Play Now</PlayBtn>
    </Wrapper>
  );
};

export default DesktopVendorTab;
