import React, {useState, useEffect} from 'react';
import Header from './Header';


function App({web3, accounts, contracts}) { //props
 
  // set state
  const [tokens, setTokens] = useState([]);
  const [user, setUser] = useState({
    accounts: [],
    selectedToken: undefined
  });
  
  // takes user and token
  // called each time the token is changed by the user
  const selectToken = token => {
    setUser({...user, selectedToken: token});
  }

  // trigger at start of app
  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.dex.methods.getTokens().call(); // get list of tooken
      const tokens = rawTokens.map(token => ({ 
        ...token,//desstructure token
        ticker: web3.utils.hexToUtf8(token.ticker) // convert to readable form 
      }));
      setTokens(tokens); // save token to state
      setUser({accounts, selectedToken: tokens[0]});
    }
    init();

    }, [web3.utils, accounts, contracts.dex.methods]);

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
        selectedToken={selectToken} //the selected token
      />


      <div>
      <h1> Main Part</h1>
      </div>
    </div>

  );
}

export default App;
