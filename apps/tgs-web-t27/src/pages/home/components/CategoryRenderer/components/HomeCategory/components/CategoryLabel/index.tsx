import { FC } from "react";
import styled from 'styled-components';

type Props = {
  imageUrl: string;
  text: string;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    color:${({ theme }) => theme.white};
    margin-left: 10px;
    font-size: 19.5px;
    font-weight: 400;
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
