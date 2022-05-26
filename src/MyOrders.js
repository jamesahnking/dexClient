import React from 'react'
import Moment from 'react-moment';

function MyOrders({ orders }) {
   
const renderList = (orders, side, className) => {
return (
    <>
    <table className={`table table-striped mb-01 order-list ${className}`}>
          <thead>
            <tr className="table-title order-list-title">
              <th colSpan="3">{side}</th>
            </tr>
            <tr>
              <th>Amount / Filled</th>
              <th>Price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.amount} / {order.filled}</td>
                <td>{order.price}</td>
                <td>
                <Moment fromNow>{parseInt(order.date) * 1000}</Moment>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </> 
    );
}

return (
    <div className="card">
      <h2 className="card-title">My Order</h2>
      <div className="row">
        <div className="col-sm-6">
          {renderList(orders.buy, "Buy", "order-list-buy")}
        </div>
        <div className="col-sm-6">
          {renderList(orders.sell, "Sell", "order-list-sell")}
        </div>
      </div>
    </div>
  
    )
}

export default MyOrders;