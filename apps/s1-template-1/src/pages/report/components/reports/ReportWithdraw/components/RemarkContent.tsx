import { TagStatusApproved, TagStatusPaid, TagStatusPaying, TagStatusPending, TagStatusProcessing, TagStatusRejected } from "@/components/styled-component/Report";
import { EditIcon } from "@/components/UI/CustomizeIcon";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const EditIconContainer = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 2rem;
  background: #304056;
  position: relative;
  top: 2px;
  margin-left: .4rem;
  cursor: pointer;
`;

const RemarkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  content: any;
  status: any;
};
const RemarkContent = ({ content, status }: Props) => {
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();
  const handleRemark = (content: any) => {
    alert("", content);
  };
  return (
    <RemarkWrapper onClick={() => {
      handleRemark(content);
    }}>
        {(() => {
        switch (status) {         
          case 1:
            return <TagStatusPending>{i18n.t(`report.withdrawal.status${status}`)}</TagStatusPending>;
          case 2:
            return <TagStatusProcessing>{i18n.t(`report.withdrawal.status${status}`)}</TagStatusProcessing>;
          case 3:
            return <TagStatusApproved>{i18n.t(`report.withdrawal.status${status}`)}</TagStatusApproved>;
          case 4:
            return <TagStatusRejected>{i18n.t(`report.withdrawal.status${status}`)}</TagStatusRejected>;
          case 5:
            return <TagStatusPaying>{i18n.t(`report.withdrawal.status${status}`)}</TagStatusPaying>;
          case 6:
            return <TagStatusPaid>{i18n.t(`report.withdrawal.status${status}`)}</TagStatusPaid>;
          default:
            return null;
        }
      })()}
      {!isDesktopSize && !!content && 
        <EditIconContainer >
          <EditIcon sx={{fontSize: "1rem", color: "#C3D6F1"}} viewBox="0 0 10 10"></EditIcon>
        </EditIconContainer>}
    </RemarkWrapper>
    
  );
};

export default RemarkContent;
