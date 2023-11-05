import styled from "styled-components";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 20px;
    border: 1px solid  rgba(255, 255, 255, 0.30);
    background-color: ${({ theme }) => theme.mainDarkBackground};
`;

const InputTextfield = styled.input`
    display: flex;
    align-items: flex-start;
    outline: none;
    border: 0;
    background-color: transparent;
    outline: none;
    width: 100%;
    font-size: 0.875rem;
    color: ${(props) => props.theme.lightGray};
    &::placeholder {
            color: ${(props) => props.theme.tertiary};
            font-weight: 700;
            line-height: 0.875rem;
        }

        &:focus {
            outline: none;
        }
`;

const SearchInput = ({ placeholder, imageUrl, value, handleChange }: Props) => {
  return (
    <InputWrapper>
      <InputTextfield
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {imageUrl && <img src={imageUrl} alt={"Search"} />}
    </InputWrapper>
  );
};

export default SearchInput;
