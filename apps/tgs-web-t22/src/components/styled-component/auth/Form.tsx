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
  display: block;
  margin-top: 16px;
  color: ${({ theme }) => theme.white};
  text-align: center;
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  text-decoration-line: underline;
`;
export const RedirectContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: baseline;
  justify-content: center;
  width: 100%;

  .link {
    color: ${({ theme }) => theme.white};
    font-weight: 700;
    font-size: 0.875rem;
    font-weight: 400;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const FormTabs = styled.div`
  margin-bottom: 36px;
  width: 100%;
  display: flex;
  border-radius: 8px; 
  border: 1px #9A604C solid;
  background: ${({ theme }) => theme.lightBlack};
`;

export const FormTab = styled.div<{
  $isActive?: boolean,
}>`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px; 
  background: ${({ theme, $isActive }) => $isActive ? theme.activeTab : ''};
  color: ${({ theme, $isActive }) => $isActive ? theme.white : theme.labelText};
  width: 50%;
  font-size: 1.2 rem;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
`;