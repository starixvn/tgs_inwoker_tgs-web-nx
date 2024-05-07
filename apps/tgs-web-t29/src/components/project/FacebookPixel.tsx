//@ts-ignore
import {Helmet} from "react-helmet";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";

const FacebookPixel = () => {
    const {isInitYuriJs} = brandConfig[mapBrandName(config.brand)];
    // MOMO 客製化設定
    if(isInitYuriJs) {
        return (
            <Helmet>
                <script>
                {
                    `
                    !function(y,u,r,i){y._yuri_track||((n=y._yuri_track=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}).queue=n.queue||[],y._yuri_track._fp||(y._yuri_track._fp=1,t=u.createElement(r),s=u.getElementsByTagName(r)[0],t.async=1,t.src=i,s.parentNode.insertBefore(t,s)))}(window,document,"script","https://cdn.jsdelivr.net/gh/adzon/assets/pixel.js?_rid={click_id}");
                    `
                }
                </script>
            </Helmet>
        )
    }

    return null;
};

export default FacebookPixel;