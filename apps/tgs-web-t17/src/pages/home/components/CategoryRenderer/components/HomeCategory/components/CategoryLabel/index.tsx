import { media } from "@/theme/breakpoints";
import { FC } from "react";
import styled from 'styled-components';

type Props = {
  imageUrl?: string;
  text: string;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    color: ${({ theme }) => theme.white};
    font-size: 18px;
    font-weight: 700;

    ${media.sm} {
      font-size: 25px;
  }
`;

const CategoryLabel: FC<Props> = ({ imageUrl, text }) => {
  return (
    <Wrapper>
      {imageUrl && <img src={imageUrl} alt={text} />}
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default CategoryLabel;
