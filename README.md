

For migration of contracts to appclient 
- Add pah const path = require('path'); - to truffle-config.js
- Deploy the 5 contracts using the deploy_contract.js

Migrate Your contracts using 
- truffle develp
- truffle migrate 

Seed Trader Balances - though the deploy scrip

Connect Front End To Smart Contract. with Web3
migrations/deploy_contract.js
ERC20Abi.json - https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/

Create Loading Container that loads web3 and tokens 
replace that with App js in index.js so that web three loads at start









How to solve current webpack error

https://discord.com/channels/726924356311187496/726924602235682889/934917919178125333

in client folder : 

uninstall webpack, 
delete node_modules, 
delete package-lock.json, 
set "react-scripts": "^4.0.3" and 


Parsing error: Must use import to load ES Module: /Users/jamesahnking/Documents/solidity/001_experiments/002_dex/appclient/node_modules/eslint-scope/lib/index.js
require() of ES modules is not supported.
require() of /Users/jamesahnking/Documents/solidity/001_experiments/002_dex/appclient/node_modules/eslint-scope/lib/index.js from /Users/jamesahnking/Documents/solidity/001_experiments/002_dex/appclient/node_modules/babel-eslint/lib/require-from-eslint.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from /Users/jamesahnking/Documents/solidity/001_experiments/002_dex/appclient/node_modules/eslint-scope/package.json.

/Users/jamesahnking/Documents/solidity/001_experiments/002_dex/appclient/node_modules/eslint-scope

changed index.js to index.cjs 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
