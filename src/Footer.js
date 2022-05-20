import React from 'react';
import {ReactComponent as Adexlogo} from './images/adex_logotype.svg';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="row">
      
      <div className="col-sm-3 dex-logotype-cntr">
          <Adexlogo className='dex-logotype'/>
               <p className="header-title ">
                  A DECENTRALIZED EXCHANAGE
              </p>
      </div>

      <div className="col-sm-3 flex">
        
      </div>

      <div className="col-sm-6 flex">
 
      </div>

      </div>
    </footer>
  );
};

export default Footer;

