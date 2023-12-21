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
  padding: 0px 12px;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.primary};
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
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.20);
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
