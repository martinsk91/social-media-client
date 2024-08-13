/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('/')
      cy.wait(500);} )
  
      it('log on user', ()=>{ 
         cy.get('.modal-footer')
         .find('button[data-auth="login')
         .click()
         .wait(500)
         cy.get('#loginEmail')
         .type('somemail@stud.noroff.no')
         .get('#loginPassword')
         .type('heiheihei')
         .get('#loginForm button[type="submit"]')
         .click()
         .wait(1000)
         cy.getAllLocalStorage().should(() => {
         expect(localStorage.getItem('token')).to.be.a("string");

        })
         
        
          
        })
    
        it('log out user', ()=> {
          cy.get('.modal-footer')
          .find('button[data-auth="login')
          .click()
          .wait(500)
          cy.get('#loginEmail')
          .type('somemail@stud.noroff.no')
          .get('#loginPassword')
          .type('heiheihei')
          .get('#loginForm button[type="submit"]')
          .click()
          .wait(1000)
          cy.get('button.btn-outline-warning[data-auth="logout"][data-visible="loggedIn"]')
          .click();
          cy.getAllLocalStorage().should(() => {
            expect(localStorage.getItem('token')).to.be.null; 
   
           })
          
    
      })


      it('log in wrong user', ()=> {
        cy.get('.modal-footer')
        .find('button[data-auth="login')
        .click()
        .wait(500)
        cy.get('#loginEmail')
        .type('martin@stud.noroff.no')
        .get('#loginPassword')
        .type('passord')
        .get('#loginForm button[type="submit"]')
        .click()
        cy.on ('window:alert', (text)=> {
        expect(text).to.equal('Either your username was not found or your password is incorrect');
         
        })


     
        
  
    })

    
          
    
    })

   