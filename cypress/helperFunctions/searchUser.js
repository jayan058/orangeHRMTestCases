import { fullName } from "../support/commands/userSearch";

export function checkVisibility() {
  cy.get(".oxd-loading-spinner", { timeout: 20000 }).should("be.visible");
  cy.get(".oxd-loading-spinner", { timeout: 20000 }).should("not.exist");
}

export function waitForSuggestions() {
  cy.get('div[role="listbox"]')
    .should("be.visible")
    .find("div")
    .then((suggestions) => {
      const suggestionTexts = Array.from(suggestions).map((s) =>
        s.textContent.trim(),
      );
      if (suggestionTexts.includes("Searching....")) {
        cy.wait(1000);
        waitForSuggestions();
      } else {
        const matchingSuggestion = suggestionTexts.find((s) => {
          return s.replace(/\s+/g, " ") === fullName.replace(/\s+/g, " ");
        });

        if (matchingSuggestion) {
          cy.contains('div[role="listbox"]', matchingSuggestion).click();
        } else {
          cy.log("No matching suggestion found.");
        }
      }
    });
}
