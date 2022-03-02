import React, {useState, useEffect} from 'react';
import {getWeb3, getContracts } from './utils.js';
import App from './App.js';
// What is the LoadingContainer.js
// Loads web 3 accounts and all contracts at applicaiton start

function LoadingContainer() {
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState([]);
    const [contracts, setContracts] = useState(undefined);


    useEffect(() => {
        const init = async () => {
            const web3 = await getWeb3();
            const contracts = await getContracts;
            const accounts = await web3.eth.getAccounts();
          
            // save state
            setWeb3(web3);        
            setContracts(contracts);
            setAccounts(accounts);
        }
        init();
    },[]);

    // guard check if component ready 
    const isReady = () => {
        return (
            typeof web3 !== 'undefined' && 
            typeof contracts !== 'undefined' && 
            accounts.length > 0
        );
    }
    // if its not ready 
    if(!isReady()) {
        return <div>Loading...</div>;
    }

    // return props for us in App.js
    return (
        <App web3={web3} accounts={accounts} contracts={contracts}/>
        )
}

export default LoadingContainer;