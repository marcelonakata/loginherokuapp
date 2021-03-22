import LoginPage from '../support/PageObject/loginPage'

describe("Login Page Test Suite", () => {
   
    before(function() {  
        cy.fixture("testdata").then((testdata) => {
            this.validUsername = testdata.validUsername;
            this.validPassword = testdata.validPassword;
        });
    })

    beforeEach('Access Login URL', () => {
        cy.visit('/login'); 
    });

    it('Validate login with valid username and valid password', function() {
        cy.login(this.validUsername,this.validPassword);
     
        cy.verifyMessage('You logged into a secure area!');

        cy.contains('Secure Area');
        
        cy.url().should('contain', '/secure');
    });

    it('Validate login with valid username and invalid password', function() {
        cy.login(this.validUsername, "InvalidPassword");

        cy.verifyMessage('Your password is invalid!');

        cy.contains('Secure Area').should('not.exist');
    
        cy.url().should('not.contain', '/secure');
    });

    it('Validate login with invalid username and invalid password', function() {
        cy.login("InvalidUsername", "InvalidPassword");

        cy.verifyMessage('Your username is invalid!');

        cy.contains('Secure Area').should('not.exist');

        cy.url().should('not.contain', '/secure');
    });

    it('Validate login with empty username and empty password', function() {
        cy.login("", "");

        cy.verifyMessage('Your username is invalid!');

        cy.contains('Secure Area').should('not.exist');

        cy.url().should('not.contain', '/secure');
    });

    it('Validate login with empty username and valid password', function() {
        cy.login("", this.validPassword);

        cy.verifyMessage('Your username is invalid!');

        cy.contains('Secure Area').should('not.exist');

        cy.url().should('not.contain', '/secure');
    });

    it('Validate login with valid username and empty password', function() {
        cy.login(this.validUsername, "");

        cy.verifyMessage('Your password is invalid!');

        cy.contains('Secure Area').should('not.exist');

        cy.url().should('not.contain', '/secure');
    });

    it('Verify if user is able to submit login with [Enter]', function() {
        const loginPage = new LoginPage

        loginPage.getUsername().type(this.validUsername)
        loginPage.getPassword().type(this.validPassword + '{enter}');

        cy.contains('Secure Area');
        
        cy.url().should('contain', '/secure');

    })

    it('Validate log out', function() {
        cy.login(this.validUsername, this.validPassword);

        cy.verifyMessage('You logged into a secure area!');
        
        cy.url().should('contain', '/secure');

        cy.get("i.icon-2x.icon-signout").click();

        cy.verifyMessage('You logged out of the secure area!');

        cy.contains('Login Page')
          
        cy.url().should('not.contain', '/secure');
    })

    it("Verify if user is not allowed to access secure area without filling credentials", () =>{
        cy.visit('/secure')

        cy.verifyMessage('You must login to view the secure area!');

        cy.contains('Login Page')

        cy.url().should('not.contain', '/secure');
    })
});