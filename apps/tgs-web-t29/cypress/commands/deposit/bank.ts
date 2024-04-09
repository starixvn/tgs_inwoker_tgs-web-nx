function manualBankDeposit() {
  cy.get('[data-cy="Bank"]').click();
  cy.get('[data-cy="Manual"]').click();
  cy.get('[data-cy="edfdd91e-7913-4193-b34f-08d920ec59b6"]').click();
  cy.get('input[name="name"]').type('test');
  cy.get('input[name="account"]').type('123456');
  cy.get('input[name="amount"]').type('100');
  // eslint-disable-next-line cypress/unsafe-to-chain-command
  cy.get('input[type="file"]').click().selectFile('./cypress/fixtures/test.png');
  
  cy.intercept({
    method: 'PUT',
    path: `**/deposit/manual/bank`,
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

export const bank = {
  manualBankDeposit
}