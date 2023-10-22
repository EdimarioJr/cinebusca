import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createPagesBrowserClient({
  supabaseUrl: Cypress.env("SUPABASE_URL"),
  supabaseKey: Cypress.env("SUPABASE_ANON_KEY"),
});

Cypress.Commands.add("getBySel", (selector, ...args) =>
  cy.get(`[data-test=${selector}]`, ...args)
);

Cypress.Commands.add("signIn", (redirectPath = "/") => {
  cy.session([], async () => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email: Cypress.env("TEST_ACCOUNT_EMAIL"),
        password: Cypress.env("TEST_ACCOUNT_PASSWORD"),
      });
      if (response.error) {
        return Promise.reject(response.error.message);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  });

  cy.visit(redirectPath);
});
