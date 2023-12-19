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
  color: #1b1b1b;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  //margin: 8px 0;
`;
export const ForgotPasswordContainer = styled.span`
  color: ${({ theme }) => theme.grey02};
  text-decoration: underline;
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;
`;
export const RedirectContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.black};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .link {
    color: ${({ theme }) => theme.grey02};
    text-decoration: underline;
    cursor: pointer;
    font-weight: 700;
  }
`;
