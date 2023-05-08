# Plurality Extension

This extension was created to keep the secrets of identity as private and only in control of the user.

The extension interacts with the dApp running in browser to create and transfer the public identity commitment. Moreover, it can also generate and transfer the proofs to the browser dApp.

## How to run this extension

In the project directory, you can run:

### `npm install`

Then, you need to build the extension distribution. For this, you can run:

### `npm run build`

Now, you need to load the extension in the browser.

NOTE: This extension is only compatible with chrome right now due to the usage of chrome specific APIs.

For this, open the chrome browser and go to chrome extensions tab:

### `chrome://extensions/`

Then, on the top right, there will a developer mode toggle button. Turn it on.

### `Toggle developer mode button to on`

Then on the top left, there will be a button called "load unpacked". Click on it. It will open a file explorer. You need to select the dist/ folder created in your project.

### `Click on load unpacked and select dist/ folder`

Finally, you can pin your extension and click on it to use it.
