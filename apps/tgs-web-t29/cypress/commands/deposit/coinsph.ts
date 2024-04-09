function manualCoinsphDeposit() {
  cy.get('[data-cy="Coinsph"]').click();
  cy.get('[data-cy="6e578a45-3e15-4751-afa8-451d7f81bd3f"]').click();
  cy.get('input[name="name"]').type('test');
  cy.get('input[name="phone"]').type('123456');
  cy.get('input[name="address"]').type('123456');
  cy.get('input[name="amount"]').type('15');
  // eslint-disable-next-line cypress/unsafe-to-chain-command
  cy.get('input[type="file"]').click().selectFile('./cypress/fixtures/test.png');
  
  cy.intercept({
    method: 'PUT',
    path: `**/deposit/manual/coinsph`,
  }, {
    fixture: '/deposit/success.json'
  }).as('success');

  cy.intercept({
    method: 'POST',
    path: `**/deposit/manual/**`,
  }, {
    fixture: '/deposit/uploadSuccess.json'
  })

  cy.get('[data-cy="deposit_submit_button"]').click();
}

export const coinsph = {
  manualCoinsphDeposit
}