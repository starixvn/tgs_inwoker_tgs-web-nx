import { LoginMode } from "./LoginMode";
import { RegisterMode } from "./RegisterMode";
import { Mode, TabsData} from "@/components/UI/Tabs";

/**
* 渲染 RegisterMode 對應元件
* @return JSX
*/
const renderRegisterMode = () => <RegisterMode />;

/**
* 渲染 LoginMode 對應元件
* @return JSX
*/
const renderLoginMode = () => <LoginMode />

// Tabs Data
const data: TabsData<Mode>[]  = [
    {   
        label: "common.login",
        render: renderLoginMode,
        mode: "login",
    },
    {
        label: "common.register",
        render: renderRegisterMode,
        mode: "register",
    },
];

// custom tabs style
const tabsStyle = {
    margin: "0 auto 36px",
    maxWidth: "500px",
    width: "100%"
};

export {
    data,
    tabsStyle,
}