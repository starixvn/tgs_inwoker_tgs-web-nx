import { useEffect } from 'react';

const RocketChatLiveChat = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = `
          (function(w, d, s, u) {
              w.RocketChat = function(c) { w.RocketChat._.push(c); };
              w.RocketChat._ = [];
              w.RocketChat.url = u;
              var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
              j.async = true;
              j.src = 'https://rocketchat.nexentgame.com/livechat/rocketchat-livechat.min.js?_=201903270000';
              h.parentNode.insertBefore(j, h);
          })(window, document, 'script', 'https://rocketchat.nexentgame.com/livechat');

          RocketChat(function() {
    
            this.setDepartment('${import.meta.env.VITE_LIVE_CHAT_DEPARTMENT}');

            });
        `;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

    }, []);

    return null;
}

export default RocketChatLiveChat;