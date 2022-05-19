import React, { useState } from 'react'

// Order Type
const TYPE = {
    LIMIT: 'LIMIT',
    MARKET: 'MARKET'
};

// Trade Side
const SIDE = {
    BUY: 0,
    SELL: 1
};

function NewOrder({createMarketOrder, createLimitOrder}) {
    const [order,setOrder] = useState({
        type: TYPE.LIMIT,
        side: SIDE.BUY,
        amount: '',
        price: ''
    });


const onSubmit = (e) => {
    e.preventDefault();
    if(order.type === TYPE.MARKET) {
        createMarketOrder(order.amount, order.side);
    } else {
        createLimitOrder(order.amount,order.price, order.side);
    }
}


  return (
    <div id="orders" className="card">
        <h2 className="card-title">New Order</h2>
        {/* Form Start */}
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group row">
                <label htmlFor="type" className="col-sm-4 col-form-label">Type</label>
                    <div className="col-sm-8">
                        <div id="type" className="btn-group" role="group">

                        {/* Limit and Market Buttons  */}
                        <button 
                            type="button"
                            className={`btn btn-secondary ${order.type === TYPE.LIMIT ? 'active' : ''}`}
                            onClick={() => setOrder(order => ({ ...order, type: TYPE.LIMIT}))}
                        >Limit</button>

                        <button 
                            type="button"
                            className={`btn btn-secondary ${order.type === TYPE.MARKET ? 'active' : ''}`}
                            onClick={() => setOrder(order => ({ ...order, type: TYPE.MARKET}))}
                        >Market</button>
                            
                            </div>
                        </div>
                    </div>
                        
                {/* Side of the TX */}
                <div className="form-group row">     
                    <label htmlFor="side" className="col-sm-4 col-form-label">Side</label>
                    <div className="col-sm-8">
                        <div id="side" className="btn-group" role="group">
                        <button 
                            type="button"
                            className={`btn btn-secondary ${order.side === SIDE.BUY ? 'active' : ''}`}
                            onClick={() => setOrder(order => ({ ...order, side: SIDE.BUY}))}
                            
                        >Buy</button>
                        <button 
                            type="button"
                            className={`btn btn-secondary ${order.side === SIDE.SELL ? 'active' : ''}`}
                            onClick={() => setOrder(order => ({ ...order, side: SIDE.SELL}))}
                        >Sell</button>
                        </div>
                    </div>
                </div>

                {/* Amount Field  */}
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="order-amount" >Amount</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="order-amount"
                            onChange={({target: { value }}) => setOrder(order =>({...order, amount: value}))}                        
                        />
                    </div>
                </div>

                {/* Price Field - If the order is a marekt order price does not apply and should not be set */}

                {order.type === TYPE.MARKET ? null : 

                    <div className="form-group row">
                    <label className="col-sm-4 col-form-label" htmlFor="order-price" >Price</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="order-price"
                            onChange={({target: { value }}) => setOrder(order =>({...order, price: value}))}                        
                        />
                    </div>
                </div>
                }    

                {/* Submit Button */}
                <div className="text-right">
                    <button type="submit" className="btn btn-primary">Submit New Order</button>
                </div>
            </form>
        {/* Main Card End*/}
    </div>
  
  );
}

export default NewOrder;