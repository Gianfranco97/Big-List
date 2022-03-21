/* eslint-disable cypress/no-unnecessary-waiting */

const USER = {
  email: 'gianfrancomanganiello1997@gmail.com',
  password: 'MyPassword',
};

const EMPLOYEE = {
  name: 'Gianfranco',
  email: 'gianfrancomanganiello1997@gmail.com',
  age: 24,
  salary: 33000,
};

const EMPLOYEE_EDITED = {
  name: 'Gianfranco (Contratado en Big-Buy)',
  email: 'gianfrancomanganiello1997@gmail.com',
  age: 24,
  salary: 43000,
};

const TIME_WAIT = 2100;

describe('Big-list End to End Testing', () => {
  before(() => {
    sessionStorage.clear();
  });

  it('Forgot password message', () => {
    cy.visit('http://localhost:3000');
    cy.get('.login-form__go-forgot').click();
    cy.get('#email').type(USER.email);
    cy.get('.ant-btn').click();
    cy.get('h2');
  });

  it('Login user', () => {
    cy.visit('http://localhost:3000');
    cy.get('#username').type(USER.email);
    cy.get('#password').type(USER.password);
    cy.get('.ant-btn').click();
  });

  it('Employees', () => {
    // Add new employee
    cy.get('.employees-list__add-btn').click();
    cy.get('#userForm_name').type(EMPLOYEE.name);
    cy.get('#userForm_email').type(EMPLOYEE.email);
    cy.get('#userForm_age').type(EMPLOYEE.age);
    cy.get('#userForm_salary').type(EMPLOYEE.salary);

    cy.get('.ant-btn-primary').click();
    cy.wait(TIME_WAIT);

    cy.get('tbody > tr:first').should('contain', EMPLOYEE.name.toLocaleUpperCase());

    // Update employee
    cy.get('tbody > tr:first > td[class*="ant-table-cell-fix-righ"] > .my-list__actions > button:first').click();

    cy.get('#userForm_name').clear().type(EMPLOYEE_EDITED.name);
    cy.get('#userForm_email').clear().type(EMPLOYEE_EDITED.email);
    cy.get('#userForm_age').clear().type(EMPLOYEE_EDITED.age);
    cy.get('#userForm_salary').clear().type(EMPLOYEE_EDITED.salary);

    cy.get('.ant-btn-primary').click();

    cy.wait(TIME_WAIT);

    cy.get('tbody > tr:first').should('contain', EMPLOYEE_EDITED.name.toLocaleUpperCase());

    // Delete employee
    cy.get('tbody > tr:first > td[class*="ant-table-cell-fix-righ"] > .my-list__actions > button:last').click();
    cy.get('.ant-modal-confirm-btns > .ant-btn-dangerous').click();

    cy.wait(TIME_WAIT);

    cy.get('tbody > tr:first').should('not.contain', EMPLOYEE_EDITED.name.toLocaleUpperCase());
  });

  it('Logout', () => {
    cy.get('.ant-layout-header > .anticon > svg').click();
    cy.get('.ant-modal-confirm-btns > .ant-btn-dangerous').click();
    cy.get('.login-form').should('exist');
  });
});
