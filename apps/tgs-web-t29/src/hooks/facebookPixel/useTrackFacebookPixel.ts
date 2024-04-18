import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";

/**
 * YuriJsParam
 * @alias AddToCart 完成注册
 * @alias Purchase 存款成功
 * @description 對應文件 https://feiran-tech.notion.site/Integration-Guide-for-Yuri-JS-Tracking-054bc24ed7f9469eb18771036871b428
 */
type YuriJsParam = 'AddToCart' | 'Purchase';
/**
 * useTrackFacebookPixel 使用 Yuri Js 封裝工具發送 Facebook Pixel 追蹤代碼 
 * @param key 追蹤項目
 * @returns 追蹤方法
 */
const useTrackFacebookPixel = () => {
    const sendFbTrack = (key: YuriJsParam) => {

        // MOMO 客製化設定
        if(!brandConfig[mapBrandName(config.brand)].isInitYuriJs) {
            return;
        }

        //@ts-ignore
        if(_yuri_track && typeof _yuri_track === 'function') {
            //@ts-ignore
            _yuri_track("AddToCart"); 
        }
    }

    return {
        sendFbTrack,
    };
}

export default useTrackFacebookPixel;