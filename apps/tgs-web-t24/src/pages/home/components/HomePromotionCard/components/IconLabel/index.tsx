import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12.15px 11px 0px;
  gap: 8px;
`;

const Text = styled.div`
  color:  ${({ theme }) => theme.white};
  font-size: 13.781px;
  font-weight: 400;
  border-radius: 3px;
  line-height: 21px;
  letter-spacing: 0.131px;
`;

const Icon = styled.img`
  width: 14.33px;
  height: 16px;
`;

type Props = {
  imageUrl: string;
  text: string;
}

const IconLabel = ({ imageUrl, text }: Props) => {
  return (
    <Wrapper>
      <Icon src={imageUrl} alt={text} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default IconLabel;
