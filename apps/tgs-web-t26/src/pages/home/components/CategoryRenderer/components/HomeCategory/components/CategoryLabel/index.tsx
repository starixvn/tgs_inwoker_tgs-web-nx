import { FC } from "react";
import styled from "styled-components";

type Props = {
  imageUrl: string;
  text: string;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.darkGray};
  border-radius: 10px;
  padding: 6px 15px;
  font-size: 30px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
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
