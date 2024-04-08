import { interceptAPIs, type api } from "./utils";

function enterLoginInfo(username = 'testFE1', password = 'testFE1') {
  cy.get('[data-cy="popupHeader-close-button"]').click();
  cy.get('[data-cy="mobilePopupPromotion_close-button"]').click();
  cy.get('[data-cy="login-button"]').click();
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
}


function visitDepositPage() {
  const commonApis: api[] = [
    {
      path: 'Player/info',
      fixture: 'info',
      as: 'playerInfo',
    },
    {
      path: 'bankinfo',
      fixture: 'bankInfo',
      as: 'playerInfo',
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
      path: 'withdraw',
      fixture: 'withdraw',
      as: 'withdraw',
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

  cy.wait(asApis).then(() => {
    cy.get('[data-cy="mobilePopupPromotion_close-button"]').click();
    cy.get('[data-cy="goToDeposit_button"]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}deposit`);
  });
  
}

export const deposit = {
  enterLoginInfo,
  visitDepositPage,
}