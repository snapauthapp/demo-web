# SnapAuth Demo

This is a simple web app using [SnapAuth](https://www.snapauth.app?utm_source=Github&utm_campaign=demo&utm_content=demo-readme) to demonstrate the user experience and API calls.

Use this to get an idea of what the WebAuthn experience is like on various browsers and devices.
You can use our [Client SDK](https://github.com/snapauthapp/sdk-typescript) to hook into any UI you have.
SnapAuth does not dictate your design - you can add it to your existing auth flows or create brand new ones.

There's no backend for this demo; the registration and sign-in processes ONLY use the SnapAuth APIs to save and use credentials.
In a real app, the components would talk to your own backend, which then uses one of our Server SDKs.

> [!CAUTION]
> This demo intentionally exposes the SnapAuth secret key so that it can be called by client code.
> 
> NEVER, EVER do this in a real website or application.
> You must ONLY use our server APIs from backend code.
>
> This demo does not have a backend so you can see all of the network calls involved, including server APIs.

It uses React with TypeScript and Vite - but you can use SnapAuth with any web technologies!

License: BSD-3-Clause
