import { FC } from "react";
import styled from 'styled-components';

type Props = {
  imageUrl: string;
  text: string;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 32px;
`;

const Text = styled.div`
    color: ${({ theme }) => theme.white};
    margin-left: 14px;
    font-size: 22px;
    font-weight: 700;
`;

const CategoryLabel: FC<Props> = ({ imageUrl, text }) => {
  return (
    <Wrapper>
      <img src={imageUrl} alt={text} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default CategoryLabel;
