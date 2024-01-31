import styled from "styled-components";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (searchString: string) => void;
};

const InputWrapper = styled.div`
  width: 100%;
  max-width: 149px;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  gap: 5px;
  background: color: ${({ theme }) => theme.darkGray};
  gap: 5px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.lightGray};
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
    color: ${({ theme }) => theme.lightGray};
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
