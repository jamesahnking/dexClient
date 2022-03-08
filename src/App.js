import React, {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Wallet from './Wallet.js';

function App({web3, accounts, contracts}) { //props
 
  // set state
  const [tokens, setTokens] = useState([]);
  const [user, setUser] = useState({
    accounts: [],
    balances: {
      tokenDex: 0,
      tokenWallet: 0
    },
    selectedToken: undefined
  });
  
  // takes user and token
  // called each time the token is changed by the user
  const selectToken = token => {
    setUser({...user, selectedToken: token});
  }


  // Get Balances Dex / Wallet
  const getBalances = async(account, token) => {
    const tokenDex = await contracts.dex.methods
      .traderBalances(account, web3.utils.fromAscii(token.ticker))
      .call();
    const tokenWallet = await contracts[token.ticker].methods
      .balanceOf(account)
      .call();
    return {tokenDex, tokenWallet};
  }

  // Deposit funds int
  const deposit = async amount => {
    await contracts[user.selectedToken.ticker].methods
      .approve(contracts.dex.options.address, amount)
      .send({from: user.accounts[0]});
    await contracts.dex.methods
      .deposit(amount, web3.utils.fromAscii(user.selectedToken.ticker))
      .send({from: user.accounts[0]});
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => ({...user, balances}));
  }

  // Withdraw funds 
  const withdraw = async amount => {
    await contracts.dex.methods
      .withdraw(
        amount,
        web3.utils.fromAscii(user.selectedToken.ticker)
      )
      .send({from: user.accounts[0]});
      const balances = await getBalances(
        user.accounts[0],
        user.selectedToken
      );
      setUser(user => ({...user, balances}));
  }

  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.dex.methods.getTokens().call(); // get list of Tokens
      const tokens = rawTokens.map(token => ({ // map token ticker to token
        ...token,
        ticker: web3.utils.hexToUtf8(token.ticker) // convert to readable form 
      }));
      const balances = await getBalances(accounts[0], tokens[0]);
      setTokens(tokens); // save token to state
      setUser({accounts, balances, selectedToken: tokens[0]});
    }
    init();

    }, [contracts.dex.methods, web3.utils]);

    // display loading screen wiht no token 
    if(typeof user.selectedToken === 'undefined') {
      return<div> Loading... </div>
    }
    
  return (
    <div id="app">
      <Header 
        contracts={contracts}// web3 contracts
        tokens={tokens} // list of tokens 
        user={user} // user object
        selectToken={selectToken} //the selected token
      />

      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-4 first col">
            <Wallet 
              user={user}
              deposit={deposit}
              withdraw={withdraw}
            />
          </div>
        </div>
      </main>

    <Footer/>
    </div>

  );
}

export default App;
