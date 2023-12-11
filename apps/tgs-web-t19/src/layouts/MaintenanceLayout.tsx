import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

type Props = {
  children: React.ReactNode;
};
const MaintenanceLayout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MaintenanceLayout;
