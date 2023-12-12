import styled from "styled-components";

const Wrapper = styled.div<{ $alignment: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignment }) => $alignment};
  justify-content: flex-start;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.white};
  font-family: Arial sens-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  margin-top: 19px;
  letter-spacing: 0.012rem;
  white-space: pre-line;
`;

type Props = {
  imageUrl: string;
  text: string;
  alignment: string;
};

const ImageCard = ({ imageUrl, text, alignment }: Props) => {
  return (
    <Wrapper $alignment={alignment}>
      <img src={imageUrl} alt={text} />
      <Text>
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      </Text>
    </Wrapper>
  );
};

export default ImageCard;
