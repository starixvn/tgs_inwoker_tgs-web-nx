import { FC } from "react";
import styled from "styled-components";

type Props = {
  text: string;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.grey05};
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
`;

const CategoryLabel: FC<Props> = ({ text }) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default CategoryLabel;
