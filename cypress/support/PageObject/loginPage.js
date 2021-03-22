class LoginPage {
    getUsername() {
        return cy.get("input[name='username']")
    }

    getPassword() {
       return cy.get("input[name='password']")
    }

    clickSubmit() {
        cy.get("#login > button > i.fa.fa-2x.fa-sign-in")
          .click();
    }
}

export default LoginPage