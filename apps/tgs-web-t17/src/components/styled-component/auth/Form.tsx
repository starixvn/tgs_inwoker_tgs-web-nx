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
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  cursor: pointer;
`;
export const ForgotPasswordContainer = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
`;
export const RedirectContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .link {
    color: ${({ theme }) => theme.primary};
    margin-left: 8px;
    cursor: pointer;
    font-weight: 700;
  }
`;
