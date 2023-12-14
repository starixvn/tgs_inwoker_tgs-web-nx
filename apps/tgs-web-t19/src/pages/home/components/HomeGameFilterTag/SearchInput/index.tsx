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
  border-radius: 100px;
  border: 2.5px solid #B78316;
  background-color:${({ theme }) => theme.cmpBackground};
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
  color: #999;
  margin-left: 5px;
  &::placeholder {
    color: #999;
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
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />
      {imageUrl && <img src={imageUrl} alt={"Search"} />}
    </InputWrapper>
  );
};

export default SearchInput;
