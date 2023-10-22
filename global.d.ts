namespace Cypress {
  interface Chainable {
    getBySel(selector: string): Chainable;

    signIn(
      redirectPath?: string,
      credentials?: { email: string; password: string }
    ): void;
  }
}
