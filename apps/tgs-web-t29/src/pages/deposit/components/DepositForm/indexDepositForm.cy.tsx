import React from 'react'
import DepositForm from './index'

describe('<DepositForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DepositForm />)
  })
})