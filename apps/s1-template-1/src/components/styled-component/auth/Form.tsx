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
  font-size: 1.4rem;
  cursor: pointer;
`;
export const ForgotPasswordContainer = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
export const RedirectContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.245;
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
