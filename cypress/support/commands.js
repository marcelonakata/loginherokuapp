import LoginPage from '../support/PageObject/loginPage'

Cypress.Commands.add('login', (username, password) => { 
    const loginPage = new LoginPage()
    
    if (username == '')
      loginPage.getUsername().clear();
    else
      loginPage.getUsername().type(username);

    if (password == '')
      loginPage.getPassword().clear();
    else
      loginPage.getPassword().type(password);

    loginPage.clickSubmit();
 })

 Cypress.Commands.add('verifyMessage', (message) => { 
    cy.get('#flash-messages > #flash')
      .should('contain', message);
 })