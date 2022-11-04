This application is meant to demonstrate how one can add on authentication features with something as simple as 1 extra column on their Users table, and an email client. We'll be adding in functionality for user verification, how to block login until a user is verified, logging in with magic links, password reset, and two-factor authentication!

Be sure to [subscribe to our Youtube channel](https://www.youtube.com/channel/UCcKFmxtbtdruANq6kX7Hj3Q) to see this full video series and all our other programming videos!

---

Branches:

-   `base` is the core server and client setup, in the event you'd like to follow along with implementing the features yourself!
-   `verification` extends the core server and has the logic to send emails to verify user accounts upon registration and to block login attempts until the user account is verified
-   `magic_link` extends upon the verification logic (as will all other downstream features) and has the ability to send & validate a temporary token via email, then return a fully fledged login token to the user
