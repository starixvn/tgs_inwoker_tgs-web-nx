import styled from "styled-components";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (searchString: string) => void;
};

const InputWrapper = styled.div`
  width: 160px;
  height: 36px;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.lightGold};
  background: ${({ theme }) => theme.darkPrimary};;
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
  color: ${({ theme }) => theme.lightGold};
  margin-left: 5px;

  &::placeholder {
    color:${({ theme }) => theme.lightGold};
    font-weight: 400;
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
