import React from 'react';
import Dropdown from './Dropdown';
import {ReactComponent as Adexlogo} from './images/adex_logotype.svg';


function Header({
// props
user,
tokens, 
contracts,
selectToken}){
return (
    <header id="header" className="card">
        <div className="row"> 

          <div className="col-sm-3 flex">
           <div className="header-title dropdown-title">SELECT A TOKEN</div>
          <Dropdown 
            className="ml-3"
            items={tokens.map((token) => ({
              label: token.ticker,
              value: token
            }))} 
            activeItem={{
              label: user.selectedToken.ticker,
              value: user.selectedToken
            }}
            onSelect={selectToken}
          />
        </div>
            <div className="col-sm-6">
                {/* Right col */}
              <h1 className="header-title">
                  Dex - <span className='contract-address'>Contract Address: <span className="address">{contracts.dex.options.address}</span></span>
              </h1>
              <h1 className="header-title">
                  You - <span className='contract-address'>Contract Address: <span className="address">{contracts.dex.options.address}</span></span>
              </h1>
            </div>
            <div className="col-sm-3 dex-logotype-cntr ">
          <Adexlogo className='dex-logotype'/>
               <p className="">
                  A DECENTRALIZED EXCHANAGE
              </p>
      </div>

        </div>
    </header>           
    );
}

export default Header;