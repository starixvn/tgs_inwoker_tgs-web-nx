import { interceptAPIs, type api } from "../utils";
import {common} from "../common";
import {bank} from './bank';



/**
 * 登入 目前未用到
 */
function enterLoginInfo(username = 'testFE1', password = 'testFE1') {
  cy.get('[data-cy="popupHeader-close-button"]').click();
  cy.get('[data-cy="mobilePopupPromotion_close-button"]').click();
  cy.get('[data-cy="login-button"]').click();
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
}

/**
 * 攔截 前往存款頁面的所有 API
 * @see 攔截順序 不然可能會 fail : 'intercept' => visit => wait & do something
 */
function interceptDepositApi() {
  const commonApis: api[] = [
    {
      path: 'bankinfo',
      fixture: 'bankInfo',
      as: 'playerInfo',
    },
    {
      path: 'Auth/jwt',
      fixture: 'jwt',
      as: 'jwt',
    },
    {
      path: 'letter/en-US**',
      fixture: 'letter',
      as: 'letter',
    },
    {
      path: '/promotion/roulette/count',
      fixture: 'rouletteCount',
      as: 'rouletteCount',
    },
    {
      path: 'Wallet',
      fixture: 'wallet',
      as: 'wallet',
    },
    {
      path: 'game/balance/**',
      fixture: 'balance',
      as: 'balance',
    },
  ];
  const {asApis} = interceptAPIs(commonApis, 'login');
  return asApis;
}

/**
 * 造訪首頁
 * @see 攔截順序 不然可能會 fail : intercept => 'visit' => wait & do something
 */
function visitMainPage () {
  cy.visit(Cypress.config().baseUrl ?? '/');
}

/**
 * 關閉廣告視窗 & 點擊存款頁面按鈕
 * @see 攔截順序 不然可能會 fail : intercept => visit => 'wait & do something'
 */
function waitToNavigateDepositPage() {
  const commonApis = common.interceptBaseApi();
  const depositApis = interceptDepositApi();
  const apis = [...commonApis, ...depositApis]

  // cy.wait(apis).then(() => {
    // cy.get('[data-cy="popupHeader-close-button"]').click();
    // cy.get('[data-cy="mobilePopupPromotion_close-button"]').click();
    // cy.get('[data-cy="goToDeposit_button"]').click();
    // cy.url().should('eq', `${Cypress.config().baseUrl}deposit`);
  // });
  cy.get('[data-cy="popupHeader-close-button"]').click();
  cy.get('[data-cy="mobilePopupPromotion_close-button"]').click();
  cy.get('[data-cy="goToDeposit_button"]').click();
  cy.url().should('eq', `${Cypress.config().baseUrl}deposit`);
  
}

/**
 * 前往存款頁面
 */
function visitDepositPage () {
  interceptDepositApi();
  visitMainPage();
  waitToNavigateDepositPage();
}



export const deposit = {
  visitDepositPage,
  bank,
}