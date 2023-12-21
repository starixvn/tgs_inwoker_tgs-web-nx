import { FC } from "react";
import styled from "styled-components";

type Props = {
  imageUrl: string;
  text: string;
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    color:  ${({ theme }) => theme.primary};
    margin-left: 8px;
    font-size: 16.719px;
    font-weight: 700;
    line-height: 28px;
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
