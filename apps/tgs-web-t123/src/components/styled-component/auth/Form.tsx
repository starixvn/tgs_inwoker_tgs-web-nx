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
  font-size: 0.875rem;
  cursor: pointer;
  //margin: 8px 0;
`;
export const ForgotPasswordContainer = styled.span`
  color: ${({ theme }) => theme.white};
  font-size: 1.062rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: underline;
`;
export const RedirectContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .link {
    color: ${({ theme }) => theme.primary};
    margin-left: 8px;
    cursor: pointer;
    font-weight: 700;
  }
`;
