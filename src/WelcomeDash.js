import React from 'react'
import {ReactComponent as AdexImgLogo} from './images/adex_logoImg.svg';
const WelcomeDash = () => {
  return (
    <div id= "dash" className="card card-content">

      <div className= "row">
       <div className="col-sm-6 text-content" >
            <AdexImgLogo className="logo-scale "/>
        </div>
        <div className="col-sm-6">
           <h3>What is a DEX?</h3>
           <p>DEX is short for Decentralized Exchange. A DEX is a peer-to-peer marketplace that coordinates the trading of crypto assets between users. DEX transactions occur without the use of an intermediary.</p>
           <h3>About this DEX</h3>
           <p>This DEX trades ERC20 tokens, and DAI is used to quote the price for each crypto asset.</p>
           <ol>

            <li>This DEX uses a conventional exchange order book. </li>
            <li>A user can create one of four types of orders. A Market Buy Order, Market Sell Order, Limit Buy Order, and a Limit Sell order. </li>
            <li>Select one of the four, token options, ADA, SMT, or BAT from the dropdown to trade.</li>
        

           </ol>
        </div>
        </div>
    </div>  

  )
}

export default WelcomeDash

