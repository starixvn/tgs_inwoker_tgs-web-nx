import {interceptAPIs, type api} from "../utils";
import {common} from "../common";
import {bank} from './bank';
import {coinsph} from './coinsph';
import {thirdParty} from "./thirdParty";
import {fps} from "./fps";
import {eWallet} from "./eWallet";
import {pulsa} from "./pulsa";
import {trc} from "./trc";

const defaultUser = 'testFE1'; // STG環境 前端測試用帳密

/**
 * 登入 目前未用到
 */
function enterLoginInfo(username = defaultUser, password = defaultUser) {
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
    },
    {
      path: 'withdraw',
      fixture: 'withdraw',
    },
    {
      path: 'Auth/jwt',
      fixture: 'jwt',
    },
    {
      path: 'letter/en-US**',
      fixture: 'letter',
    },
    {
      path: '/promotion/roulette/count',
      fixture: 'rouletteCount',
    },
    {
      path: 'Wallet',
      fixture: 'wallet',
    },
    {
      path: 'game/balance/**',
      fixture: 'balance',
    },
  ];

  interceptAPIs(commonApis, 'login');
}

/**
 * 造訪首頁
 * @see 攔截順序 不然可能會 fail : intercept => 'visit' => wait & do something
 */
function visitLoginPage () {
  common.interceptBaseApi();
  cy.visit(`${Cypress.config().baseUrl}login` ?? '/');
  enterLoginInfo();
}

/**
 * 關閉廣告視窗 & 點擊存款頁面按鈕
 * @see 攔截順序 不然可能會 fail : intercept => visit => 'wait & do something'
 */
function waitToNavigateDepositPage() {
  cy.intercept({
    url: '**/api/Deposit',
    method: 'GET'
  }, {
    fixture: '/deposit/depositList.json'
  }).as('depositList');

  cy.get('[data-cy="goToDeposit_button"]').click();

  cy.wait('@depositList').then(() => {
    cy.url().should('eq', `${Cypress.config().baseUrl}deposit`);
  })
}

/**
 * 前往存款頁面
 */
function visitDepositPage () {
  common.interceptBaseApi();
  interceptDepositApi();
  visitLoginPage();
  waitToNavigateDepositPage();
}



export const deposit = {
  visitDepositPage,
  bank,
  coinsph,
  thirdParty,
  fps,
  eWallet,
  pulsa,
  trc,
}