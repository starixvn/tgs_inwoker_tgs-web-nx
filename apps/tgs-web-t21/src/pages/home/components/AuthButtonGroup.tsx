import React from "react";
import styled from "styled-components";

const AuthButtonGroupContainer = styled.div``;
const AuthButtonGroup = styled.div`
  display: flex;
`;

type Props = {};

const AuthButtonGroup = (props: Props) => {
  return (
    <AuthButtonGroupContainer>
      <AuthButtonGroupContainer>
        <button />
        <button />
      </AuthButtonGroupContainer>
    </AuthButtonGroupContainer>
  );
};

export default AuthButtonGroup;
