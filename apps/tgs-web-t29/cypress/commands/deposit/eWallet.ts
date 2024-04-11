function manualeWalletDeposit() {
    cy.get('[data-cy="E-wallet"]').click();
    cy.get('input[name="eMoneyName"]').type('123');
    cy.get('input[name="phone"]').type('123');
    cy.get('input[name="amount"]').type('15');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[type="file"]').click().selectFile('./cypress/fixtures/test.png');
    
    cy.intercept({
        method: 'PUT',
        path: `**/deposit/manual/ewallet`,
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

export const eWallet = {
    manualeWalletDeposit
}