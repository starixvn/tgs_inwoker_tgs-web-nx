import { CSSProperties } from "react";
import { useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { Tabs, Tab } from "./components/Tabs";
export type Mode = "login" | "register"

export interface TabsData<M> {
    label: string
    mode: M
    render: () => JSX.Element
}

export interface Config {
    data: TabsData<Mode>[],
    defaultMode: Mode,
    isEnable?: boolean,
    handleOnClickTab?: () => void,
    handleOnChange?: () => void,
}

/**
 * 渲染 Tabs 元件 & 取得對應 value
 * @param config 渲染設定 
 * @return renderTabs: <Tabs />, value: selected index
 */
export const useToggleTabs = (config: Config) => {
    const { data, defaultMode, isEnable, handleOnChange, handleOnClickTab } = config;
    const getModeIndex = data.findIndex(row => row.mode === defaultMode);
    const defaultValue = isEnable && getModeIndex !== -1 ? getModeIndex : 0;

    const [ value, setValue ] = useState(defaultValue);

    /**
     * 處理 Tabs 切換模式
     * @param event 
     * @param newValue 
     */
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if(isEnable) {
            setValue(newValue);
        }
        if(isEnable && handleOnChange) {
            handleOnChange();
        }
    };

    /**
     * 渲染 Tabs 元件
     * @param style
     * @return `<Tabs />`
     */
    const renderTabs = (style?: CSSProperties) => {
        if(!isEnable) {
            return null;
        }

        return (
            <Tabs value={value} variant="fullWidth" style={style} onChange={handleChange}>
                {data.map((row, i) => <Tab key={i} label={i18n.t(row.label)} onClick={handleOnClickTab} />)}
            </Tabs>
        )
    };

    return {
        renderTabs,
        modeIndex: value,
    }
};

