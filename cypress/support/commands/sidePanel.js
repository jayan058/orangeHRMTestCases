Cypress.Commands.add("searchSidePanel", (query) => {
  cy.get('input[placeholder="Search"]').type(query);
});

Cypress.Commands.add("validateSearchResult", (query) => {
  cy.get(".oxd-main-menu-item").each(($el) => {
    const href = $el.attr("href");
    expect(href).to.contain(query.toLowerCase());
  });
});
