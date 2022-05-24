import React from 'react';
import {ReactComponent as Adexlogo} from './images/adex_logotype.svg';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="row">
      
      <div className="col-sm-3 dex-logotype-cntr">
          <Adexlogo className='dex-logotype'/>
        
      </div>


      <div className="col-sm-9 flex">
 
      </div>

      </div>
    </footer>
  );
};

export default Footer;

