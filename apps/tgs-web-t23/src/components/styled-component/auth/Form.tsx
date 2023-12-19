import styled from "styled-components";

export const FormSubContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const RememberMeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.062rem;
  cursor: pointer;
  //margin: 8px 0;
`;
export const ForgotPasswordContainer = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 1.062rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
`;
export const RedirectContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 1.062rem;
  font-weight: 400;
  align-self: baseline;
  display: flex;
  align-items: center;
  justify-content: center;

  .link {
    color: ${({ theme }) => theme.primary};
    margin-left: 8px;
    cursor: pointer;
    font-weight: 700;
  }
`;
