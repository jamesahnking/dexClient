import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Wallet from "./Wallet";
import NewOrder from "./NewOrder";
import AllOrders from "./AllOrders";
import MyOrders from "./MyOrders";
import AllTrades from "./AllTrades";

// Trade Side
const SIDE = {
  BUY: 0,
  SELL: 1,
};

function App({ web3, accounts, contracts }) {
  // set state
  const [tokens, setTokens] = useState([]);
  const [user, setUser] = useState({
    accounts: [],
    balances: {
      tokenDex: 0,
      tokenWallet: 0,
    },
    selectedToken: undefined,
  });

  // order state
  const [orders, setOrders] = useState({
    buy: [],
    sell: [],
  });

  const [trades, setTrades] = useState([]);
  const [listener, setListener] = useState(undefined);

  // Get Balances Dex / Wallet
  const getBalances = async (account, token) => {
    const tokenDex = await contracts.dex.methods
      .traderBalances(account, web3.utils.fromAscii(token.ticker))
      .call();
    const tokenWallet = await contracts[token.ticker].methods
      .balanceOf(account)
      .call();
    return { tokenDex, tokenWallet };
  };

  // Get Balances Dex / Wallet
  const getOrders = async (token) => {
    const orders = await Promise.all([
      contracts.dex.methods
        .getOrders(web3.utils.fromAscii(token.ticker), SIDE.BUY)
        .call(),
      contracts.dex.methods
        .getOrders(web3.utils.fromAscii(token.ticker), SIDE.SELL)
        .call(),
    ]);
    return { buy: orders[0], sell: orders[1] };
  };

  // changed when user switches tokens 
  const selectToken = (token) => {
    setUser({ ...user, selectedToken: token });
  };

  // WebSocket Listener for Trades
  const listenToTrades = (token) => {
    // ticker from trade
    // Trade Set
    const tradeIds = new Set();
    setTrades([]);

    const listener = contracts.dex.events
      .NewTrade(
        // filter by ticker of trade
        {
          filter: { ticker: web3.utils.fromAscii(token.ticker) },
          fromBlock: 0,
        }
      )
      .on("data", (newTrade) => {
        if (tradeIds.has(newTrade.returnValues.tradId)) return;
        tradeIds.add(newTrade.returnValues.tradeId);
        setTrades((trades) => [...trades, newTrade.returnValues]);
      });
    setListener(listener);
  };

  // Deposit funds int
  const deposit = async (amount) => {
    await contracts[user.selectedToken.ticker].methods
      .approve(contracts.dex.options.address, amount)
      .send({ from: user.accounts[0] });

    await contracts.dex.methods
      .deposit(web3.utils.fromAscii(user.selectedToken.ticker), amount)
      .send({ from: user.accounts[0] });

    const balances = await getBalances(user.accounts[0], user.selectedToken);
    setUser((user) => ({ ...user, balances }));
  };

  // Withdraw funds
  const withdraw = async (amount) => {
    await contracts.dex.methods
      .withdraw(web3.utils.fromAscii(user.selectedToken.ticker), amount)
      .send({ from: user.accounts[0] });
    const balances = await getBalances(user.accounts[0], user.selectedToken);
    setUser((user) => ({ ...user, balances }));
  };

  //Create Market Order
  const createMarketOrder = async (amount, side) => {
    await contracts.dex.methods // call mareketOrder from contract
      .createMarketOrder(
        web3.utils.fromAscii(user.selectedToken.ticker),
        amount,
        side
      )
      .send({ from: user.accounts[0] });
    const orders = await getOrders(user.selectedToken);
    setOrders(orders);
  };

  //Create Limit Order
  const createLimitOrder = async (amount, price, side) => {
    await contracts.dex.methods // call mareketOrder from contract
      .createLimitOrder(
        web3.utils.fromAscii(user.selectedToken.ticker),
        amount,
        price,
        side
      )
      .send({ from: user.accounts[0] });
    const orders = await getOrders(user.selectedToken);
    setOrders(orders);
  };

  // Wallet and New OrderBased UseEffect
  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.dex.methods.getTokens().call(); // get list of Tokens
      const tokens = rawTokens.map((token) => ({
        // map token ticker to token
        ...token,
        ticker: web3.utils.hexToUtf8(token.ticker), // convert to readable form
      }));

      const balances = await getBalances(accounts[0], tokens[0]);
      const orders = await getOrders(tokens[0]);

      listenToTrades(tokens[0]);
      setTokens(tokens); // save token to state
      setUser({ accounts, balances, selectedToken: tokens[0] });
      setOrders(orders);
    };
    init();
  }, []);

  // All Orders Based UseEffect
  useEffect(() => {
    const init = async () => {
      const [balances, orders] = await Promise.all([
        getBalances(user.accounts[0], user.selectedToken),
        getOrders(user.selectedToken),
      ]);
      
      listenToTrades(user.selectedToken);
      setUser((user) => ({ ...user, balances }));
      setOrders(orders);
    };
    if (typeof user.selectedToken !== "undefined") {
      init();
    }
  }, [user.selectedToken]);

  // display loading screen wiht no token
  if (typeof user.selectedToken === "undefined") {
    return <div> Loading... </div>;
  }

  return (
    <div id="app">
      <Header
        contracts={contracts} // web3 contracts
        tokens={tokens} // list of tokens
        user={user} // user object
        selectToken={selectToken} //the selected token
      />
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-4 first col">
            <Wallet user={user} deposit={deposit} withdraw={withdraw} />
            {user.selectedToken.ticker !== "DAI" ? (
              <NewOrder
                createLimitOrder={createLimitOrder}
                createMarketOrder={createMarketOrder}
              />
            ) : null}
          </div>
          {user.selectedToken.ticker !== "DAI" ? (
            <div className="col-sm-8">

              <AllTrades trades={trades} />
            
              <AllOrders orders={orders} />

              <MyOrders
                orders={{
                  buy: orders.buy.filter(
                    (order) =>
                      order.trader.toLowerCase() === accounts[0].toLowerCase()
                  ),
                  sell: orders.sell.filter(
                    (order) =>
                      order.trader.toLowerCase() === accounts[0].toLowerCase()
                  ),
                }}
              />
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
