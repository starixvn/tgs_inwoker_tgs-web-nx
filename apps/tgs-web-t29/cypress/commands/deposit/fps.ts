function manualFPSDeposit() {
    cy.get('[data-cy="FPS"]').click();
    cy.get('input[name="account"]').type('123');
    cy.get('input[name="amount"]').type('15');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('input[type="file"]').click().selectFile('./cypress/fixtures/test.png');
    
    cy.intercept({
        method: 'PUT',
        path: `**/deposit/manual/fps`,
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

export const fps = {
    manualFPSDeposit
}