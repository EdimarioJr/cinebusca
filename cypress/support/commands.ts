import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createPagesBrowserClient({
  supabaseUrl: Cypress.env("supabase_url"),
  supabaseKey: Cypress.env("supabase_anon_key"),
});

Cypress.Commands.add("getBySel", (selector, ...args) =>
  cy.get(`[data-test=${selector}]`, ...args)
);

Cypress.Commands.add("signIn", (redirectPath = "/") => {
  cy.session([], async () => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email: Cypress.env("test_account_email"),
        password: Cypress.env("test_account_password"),
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
