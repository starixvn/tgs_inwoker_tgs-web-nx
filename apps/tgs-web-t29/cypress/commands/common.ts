import {interceptAPIs} from './utils';


/**
 * 攔截API 取得遊戲大廳所有 API
 */
function interceptBaseApi() {
  const commonApis = [
      {
          path: 'translation/en-US.json',
          fixture: 'translation/en-US',
          as: 'translation',
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
        path: 'announcement/list/en-US',
        fixture: 'announcementList',
        as: 'announcementList',
      },
      {
        path: 'brandallagent/check',
        fixture: 'brandAllAgent',
        as: 'brandAllAgent',
      },
  ];

  const {asApis} = interceptAPIs(commonApis, 'common');

  cy.visit(Cypress.config().baseUrl ?? '/')
  cy.wait(asApis)
}




function setLang(lang = 'en-US') {
  localStorage.setItem('i18nextLng', lang)
}

export const common = {
  interceptBaseApi,
  setLang,
};