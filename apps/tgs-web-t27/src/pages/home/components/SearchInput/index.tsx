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
  padding: 0px 24px;
  background: #17191B;
  gap: 10px;
`;

const InputTextfield = styled.input`
  display: flex;
  align-items: flex-start;
  outline: none;
  border: 0;
  background-color: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
  
  &::placeholder {
    color: ${({ theme }) => theme.g8};
  }

  &:focus {
    outline: none;
  }
`;

const SearchInput = ({ placeholder, imageUrl, value, handleChange }: Props) => {
  return (
    <InputWrapper>
      {imageUrl && <img src={imageUrl} alt={"Search"} />}
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
