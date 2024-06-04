import styled from "styled-components"
import { i18n } from "@tgs-web-nx/utils";

export const NoData = () => {
    return (
        <Container>
            <Text>{i18n.t("common.msgRequestFailed")}</Text>
        </Container>
    )
}

const Container = styled.div`
    margin: 30px auto;
    background: #F37A3F;
`;

const Text = styled.p`
    font-weight: 400;
    font-size: 13px;
    color: #fff;
    line-height: 15px;
`;