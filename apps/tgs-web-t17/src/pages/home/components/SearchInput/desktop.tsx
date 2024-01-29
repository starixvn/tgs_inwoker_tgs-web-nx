import styled from "styled-components";

type Props = {
  placeholder?: string;
  imageUrl?: string;
  value?: string;
  handleChange: (searchString: string) => void;
};

const InputWrapper = styled.div`
  width: 170px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  background: color: ${({ theme }) => theme.darkGray};
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.secondary};
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
  color: ${({ theme }) => theme.secondary};
  
  &::placeholder {
    color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    outline: none;
  }
`;

const DesktopSearchInput = ({ placeholder, imageUrl, value, handleChange }: Props) => {
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

export default DesktopSearchInput;
