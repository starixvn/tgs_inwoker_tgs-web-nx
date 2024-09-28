import styled from "styled-components";
import { EditIcon } from "@/components/UI/CustomizeIcon";

const EditIconContainer = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 2rem;
  background: #304056;
  display: inline-block;
  position: relative;
  top: 2px;
  margin-left: .4rem;
  cursor: pointer;
`;

const StyledEditIcon = () => {
  return (
    <EditIconContainer >
      <EditIcon sx={{fontSize: "1rem", color: "#C3D6F1"}} viewBox="0 0 10 10"></EditIcon>
    </EditIconContainer>
  );
};

export default StyledEditIcon;
