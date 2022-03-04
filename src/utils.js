import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import Dex from './contracts/Dex.json';
import ERC20Abi from './ERC20Abi.json';

// Connect to the ethereum network through web3
const getWeb3 = () => 
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      try {
        const web3 = new Web3(window.ethereum);
        resolve(web3);
      } catch(error) {
        reject(error);
      }
    }
    reject('Install Metamask');
  });


// Bring in ABI so we can interact and do stuff   
const getContracts = async web3 => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Dex.networks[networkId];
  const dex = new web3.eth.Contract( // instantiate contract instance for the exchange
    Dex.abi,
    deployedNetwork && deployedNetwork.address,
    );
    // get instances of ERC20 tokens
    // get list of tokens traded 
    const tokens = await dex.methods.getTokens().call();
    // Multi-input to a single input 
    // iterate through array, on each item perform a function that takes 2 arugments acc(accumulator(object that we are building)) / token(the value)
    // the output is whatever you have returned in the function 
    // Note ({}) means return
    const tokenContracts = tokens.reduce((acc, token) => ({...acc, // spread 
      // dynamic key
      [web3.utils.hexToUtf8(token.ticker)]: new web3.eth.Contract( ERC20Abi,token.tokenAddress)
    }), {});
    return { dex, ...tokenContracts}; // {dex,a, b}



};
// Instatiate ERC20 Tokens

export { getWeb3, getContracts }; 


