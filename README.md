<p align="center">
    <h1 align="center">
      <picture>
        <img width="40" alt="Plurality icon." src="https://github.com/Web3-Plurality/zk-onchain-identity-verification/blob/main/dapp-verifier/verifier-app/src/images/plurality.png">
      </picture>
      Plurality
    </h1>
</p>

| Plurality is the first identity-lego-building-block for dapp creators that lets them identify their users without using any third-party KYC provider or other middlemen, whilst preserving the privacy of users. It encourages modular application design, allowing dApp developers to choose and customize the on-chain and off-chain components they need. |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

# Plurality Extension

This extension was created to keep the secrets of identity as private and only in control of the user.

The extension interacts with the dApp running in browser to create and transfer the public identity commitment. Moreover, it can also generate and transfer the proofs to the browser dApp.

## How to run this extension

1. In the project directory, you can run:

```
npm install
```

2. Then, you need to build the extension distribution. For this, you can run:

```
npm run build
```

3. Now, you need to load the extension in the browser.

NOTE: This extension is only compatible with chrome right now due to the usage of chrome specific APIs.

For this, open the chrome browser and go to chrome extensions tab:

```
chrome://extensions/
```

4. Then, on the top right, there will a developer mode toggle button. Turn it on.

```
Toggle developer mode button to on
```

5. Then on the top left, there will be a button called "load unpacked". Click on it. It will open a file explorer. You need to select the dist/ folder created in your project.

```
Click on load unpacked and select dist/ folder
```

6. Finally, you can pin your extension and click on it to use it.

## Known Issues

With some npm versions, there is an error of legacy dependencies. The error might look something like this:

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! 
npm ERR! While resolving: react-scripts@5.0.1
npm ERR! Found: typescript@5.0.4
npm ERR! node_modules/typescript
npm ERR!   dev typescript@"^5.0.4" from the root project
npm ERR!   peer typescript@">= 2.7" from fork-ts-checker-webpack-plugin@6.5.3
npm ERR!   node_modules/fork-ts-checker-webpack-plugin
npm ERR!     fork-ts-checker-webpack-plugin@"^6.5.0" from react-dev-utils@12.0.1
npm ERR!     node_modules/react-dev-utils
npm ERR!       react-dev-utils@"^12.0.1" from react-scripts@5.0.1
npm ERR!       node_modules/react-scripts
npm ERR!         react-scripts@"5.0.1" from the root project
npm ERR!   2 more (ts-loader, tsutils)
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peerOptional typescript@"^3.2.1 || ^4" from react-scripts@5.0.1
npm ERR! node_modules/react-scripts
npm ERR!   react-scripts@"5.0.1" from the root project
npm ERR! 
npm ERR! Conflicting peer dependency: typescript@4.9.5
npm ERR! node_modules/typescript
npm ERR!   peerOptional typescript@"^3.2.1 || ^4" from react-scripts@5.0.1
npm ERR!   node_modules/react-scripts
npm ERR!     react-scripts@"5.0.1" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR! 
```

If you face this issue, please run the following command to resolve this:

```
npm install --legacy-peer-deps
```
