import styled from "styled-components";

const Wrapper = styled.div<{ $alignment: string }>`
  display: flex;
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

const Image = styled.div`
  width: 100%;
  max-width: 340px;
  margin-right: 72px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

type Props = {
  imageUrl: string;
  text: string;
  alignment: string;
};

const ImageCard = ({ imageUrl, text, alignment }: Props) => {
  return (
    <Wrapper $alignment={alignment}>
      <Image><img src={imageUrl} alt={text} /></Image>
      <Text>
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      </Text>
    </Wrapper>
  );
};

export default ImageCard;
