import styled from "styled-components";



export const DialogTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 20px;
`;
export const DialogContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  line-height: 1.2rem;
  margin-bottom: 20px;
`;

// TODO: depecrated
export const ButtonConfirm = styled.div`
  width: 50%;
  height: 90px;
  border-radius: 20px;
  font-size: 34px;
  text-align: center;
  padding-top: 24px;
  margin: 10px auto;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
`;

export const DialogContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const TwoButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  & > * {
    flex: 1;
  }
`;
