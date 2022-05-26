import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis,CartesianGrid } from 'recharts';
import Moment from 'react-moment';

function AllTrades({trades}) {
const renderList = (trades, className) => {
    return(
        <>
        <table className={`table table-striped mb-01 trade-list ${className}`}>
          <thead>
          <tr>
              <th>Amount</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.tradeId}>
                <td>{trade.amount}</td>
                <td>{trade.price}</td>
                <td>
                <Moment fromNow>{parseInt(trade.date) * 1000}</Moment>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
    )
}
const renderChart = (trades) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={trades}>
          <Line type="monotone" dataKey="price" stroke="#76E9FF" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={dateStr => {
            const date = new Date(parseInt(dateStr) * 1000); 
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          }} />
          <YAxis dataKey="price" />
        </LineChart>
        </ResponsiveContainer>
    );  
}

return (
    <div className="card">
    <h2 className="card-title">All Trades</h2>
    <div className="row">
      <div className="col-sm-12">
        {renderChart(trades)}
        {renderList(trades, "trade-list")}
      </div>
    </div>
  </div>
  )
}

export default AllTrades;