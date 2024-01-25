import styled from "styled-components";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (searchString: string) => void;
};

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.navMenuBackground};
`;

const InputTextfield = styled.input`
  margin-left: 5px;
  display: flex;
  align-items: flex-start;
  border: 0;
  background-color: transparent;
  outline: none;
  width: 100%;

  font-size: 0.7rem;
  color: ${(props) => props.theme.text};

  &::placeholder {
    color: ${(props) => props.theme.text};
    font-weight: 700;
    line-height: 0.7rem;
  }

  &:focus {
    outline: none;
  }
`;

const SearchInput = ({ placeholder, imageUrl, value, handleChange }: Props) => {
  return (
    <InputWrapper>
      {imageUrl && <img src={imageUrl} alt={"Search"} width="20px" />}
      <InputTextfield
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />
    </InputWrapper>
  );
};

export default SearchInput;
