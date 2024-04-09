import {interceptAPIs} from './utils';

const clientToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZTg2NzE5Zi0yNDNmLTQ2ZjYtYjAxMC01Yzc1OGI3Mjg1YWYiLCJqdGkiOiJiYmQwZmRhNS0zNzI5LTRjYjUtODkwMC1iZDMyMjc4ZTQ0NmYiLCJjdXJyIjoiVk5EIiwibmJmIjoxNzEyNjMwNDQ1LCJleHAiOjE3MTI2MzQwNDUsImlhdCI6MTcxMjYzMDQ0NSwiaXNzIjoib3BlcmF0b3ItYXBpIn0.DUsbUywdLfm3EquIDlZpWP7MthnT-4kIjJ-rRHTKni0';
const mapLocalStorage: Record<string, string> = {
    'i18nextLng': 'en-US',
    'client-token': clientToken,
};

/**
 * 攔截API 取得遊戲大廳所有 API
 * @returns '@ API 別名'
 */
function interceptBaseApi() {
  const commonApis = [
      {
        path: 'translation/en**',
        fixture: 'translation/en-US',
        as: 'translation',
      },
      {
        path: 'Player/info',
        fixture: 'info',
        as: 'playerInfo',
      },
      {
        path: 'api/brand',
        fixture: 'brand',
        as: 'brand',
      },
      {
        path: 'config_GPI.json',
        fixture: 'config',
        as: 'config_GPI',
      },
      {
        path: 'brandlanguage',
        fixture: 'brandLanguage',
        as: 'brandLanguage',
      },
      {
        path: 'localization',
        fixture: 'localization',
        as: 'locallization',
      },
      {
        path: 'GameProvider/list**',
        fixture: 'gameProviderList',
        as: 'gameProviderList',
      },
      {
        path: 'banner',
        fixture: 'banner',
        as: 'banner',
      },
      {
        path: 'brandcommunication',
        fixture: 'brandCommunication',
        as: 'brandCommunication',
      },
      {
        path: 'brandlivechat',
        fixture: 'brandLivechat',
        as: 'brandLivechat',
      },
      {
        path: 'promotion',
        fixture: 'promotion',
        as: 'promotion',
      },
      {
        path: 'brandallagent/check',
        fixture: 'brandAllAgent',
        as: 'brandAllAgent',
      },
      
  ];

  const {asApis} = interceptAPIs(commonApis, 'common');
  return asApis;
}


function setSessionStorage() {
  sessionStorage.setItem('doNotShowAnnouncementDialog', 'true');
  sessionStorage.setItem('doNotShowPromotionDialog', 'true');
}

/**
 * 設定未登入狀態的 localstorage
 */
function setNotAuthLocalStorage() {
  for(const key in mapLocalStorage) {
    localStorage.setItem(key, mapLocalStorage[key])
  }
  
};

/**
 * 設定登入狀態的 localstorage
 */
function setAuthLocalStorage() {
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0dWwzMzJybWJtZGwiLCJsb2dpbl9pZCI6ImMxM2ZhMDU1LWEzNjctNGI4OS1hMDZhLTYyYWQwOWVhZWE3NiIsInBsYXRmb3JtX3R5cGUiOiJEZXNrdG9wIiwibmJmIjoxNzEyNjMwNjI2LCJleHAiOjE3MTI2NzM4MjYsImlhdCI6MTcxMjYzMDYyNiwiaXNzIjoib3BlcmF0b3ItYXBpIn0.RbV-mXlg36068PVjyQBe7WFDGLQ4s42VnyaauLoixyw';
  const timeStamp =  Date.now().toString();
  const mapAuthLocalStorage: Record<string, string> = {
      ...mapLocalStorage,
      'token0': authToken,
      'token1': authToken,
      'logintime0': timeStamp,
      'logintime1': timeStamp,
  };
  
  for(const key in mapAuthLocalStorage) {
    localStorage.setItem(key, mapAuthLocalStorage[key])
  }
}

export const common = {
  interceptBaseApi,
  setNotAuthLocalStorage,
  setAuthLocalStorage,
  setSessionStorage,
};