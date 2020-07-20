# OAuth Signing Logic

This program implements the basic logic for OAuth signing. I created it to make sure I understood how it worked.

## Running the tests

This program is written in [TypeScript][] and run via [Deno][]. Follow these steps to run the tests.

1. Clone this repository.
2. Install Deno (by following [their instructions][Deno Installation]).
3. Navigate to the cloned code in your terminal.
4. Run the `deno test` command.

## Resources

These resources were very helpful for me when figuring out and verifying this algorithm.

- WordPress [Signing Requests][WordPress guide] guide
- [OAuth 1.0 Authentication Sandbox][OAuth Sandbox]


<!-- Links -->
[Deno]: https://deno.land/
[Deno Installation]: https://deno.land/#installation
[OAuth Sandbox]: http://lti.tools/oauth/
[TypeScript]: https://www.typescriptlang.org/
[WordPress guide]: https://oauth1.wp-api.org/docs/basics/Signing.html
