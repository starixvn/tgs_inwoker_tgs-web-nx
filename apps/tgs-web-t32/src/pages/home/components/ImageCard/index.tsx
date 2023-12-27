import styled from "styled-components";

const Wrapper = styled.div<{ $alignment: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignment }) => $alignment};
  justify-content: flex-start;
`;


const Text = styled.div`
  color: ${({ theme }) => theme.white};
  font-family: Gill Sans MT;
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
  title: string;
}

const ImageCard = ({ imageUrl, text, alignment, title }: Props) => {
  return (
    <Wrapper $alignment={alignment}>
      {title}
      <img src={imageUrl} alt={text} />
      <Text><div dangerouslySetInnerHTML={{ __html: text }}></div></Text>
    </Wrapper>
  );
};

export default ImageCard;
