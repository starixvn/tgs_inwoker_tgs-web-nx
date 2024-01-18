import { useRwd } from "@tgs-web-nx/core/hooks";
import { data, tabsStyle } from './data';
import { useToggleTabs, Mode, Config } from "@/components/UI/Tabs";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import BrandLogo from "@/components/project/BrandLogo";

interface Props {
    mode: Mode
}

const LoginToggleForm = ({
    mode
}: Props) => {
    const { isMobileSize } = useRwd();

    const config: Config = {
        data,
        defaultMode: mode,
        isEnable: !isMobileSize,
    }
    
    const {renderTabs, modeIndex} = useToggleTabs(config);

    return (
        <AuthFormContainer>
            {isMobileSize ? (
                //temp
                <BrandLogo style={{ marginBottom: "64px", maxWidth: "none" }} />
                ) : (
                <BrandLogo style={{ marginBottom: "67px", maxWidth: "none" }} />
                )
            }

            {renderTabs(tabsStyle)}

            <FormContainer>
                {data[modeIndex] && data[modeIndex].render()}
            </FormContainer>
            
        </AuthFormContainer>
    );
};

export default LoginToggleForm;
