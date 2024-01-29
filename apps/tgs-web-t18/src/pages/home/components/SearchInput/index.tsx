import styled from "styled-components";
import { media } from "@/theme/breakpoints";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (searchString: string) => void;
};

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.tertiary};
  padding: 10px 12px;
  border-radius: 10px;

  ${media.sm} {
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
  font-size: 0.875rem;
  color: ${(props) => props.theme.white};
  margin-left: 5px;
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
