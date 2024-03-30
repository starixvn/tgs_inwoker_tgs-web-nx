import styled from "styled-components";
import { media } from "@/theme/breakpoints";

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
  padding: 0px 10px;
  border: ${({ theme }) => `1px solid ${theme.grey03}`};
  border-radius: 4px;
  gap: 10px;
  ${media.sm} {
    border: unset;
    background: ${({ theme }) => theme.primary};
  }
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
  color: ${({ theme }) => theme.black};
  &::placeholder {
    color: ${({ theme }) => theme.grey01};
  }

  &:focus {
    outline: none;
  }
  ${media.sm} {
    color: ${({ theme }) => theme.white};
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
