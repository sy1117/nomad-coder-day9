# nomad-coder-day9

Created with CodeSandbox
First of all, today's blueprint is based on the amazing work made by @blackstar0223 last friday! Wow, what a legend!

On this two days you will have to implement user authentication and user CRUD.

As you probably already know we are building a Podcast Discovery Application, where hosts of the podcast can create their podcast and upload episodes, also, listeners of the podcast can listen and subscribe to podcasts.

Your mission is to make a users module with entities, services and resolvers.

Here are the requirements for the user authentication:

- [ ] Users should be able to login with a password.
- [ ] There should be only **one** user entity but your entity should support two roles 'Host' and 'Listener'.
- [ ] Create Guards to protect private resolvers.
- Use JWT as authentication method.
- [ ] Create a decorator to get the logged in user.
      Here are the resolvers you need to implement:

- [ ] createAccount
- [ ] login
- [ ] editProfile
- [ ] seeProfile

Keep in mind, we must hash the passwords using bcrypt.

Bonus points if you create your own JwtModule.

P.S: The blueprint sandbox already has all dependencies installed.
