import styled from "styled-components";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (searchString: string) => void;
};

const InputWrapper = styled.div`
  padding: 10px;
  width: 160px;
  display: flex; 
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({theme}) => theme.gray02};
`;

const InputTextfield = styled.input`
  margin-left: 8px;
  display: flex;
  align-items: flex-start;
  border: 0;
  background-color: transparent;
  outline: none;
  width: 100%;

  font-size: 0.7rem;
  color: ${(props) => props.theme.gray02};

  &::placeholder {
    color: ${(props) => props.theme.gray02};
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
