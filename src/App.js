import React, { Component } from 'react';
import './App.css';
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();


class App extends Component {
  state = {
    bitcoin: "current_price",
    usd: 0,
    loading: true,
    currentbtcprice: '',
    error: false
  }

  componentDidMount = async () => {
    let data = await CoinGeckoClient.coins.markets();
    console.log(data)
    if (data) {
      this.setState({ error: false })
      this.setState({ currentbtcprice: data.data[0]["current_price"] })
      console.log(this.state.currentbtcprice)
      setTimeout(() => { this.setState({ loading: false }) }, 1500)
    } else {
      this.setState({ error: true })
    }
  }

  //   convertCurrency(value) {
  //     //convert From API value BTC to USD

  //     // setState( {
  //     valueBTC: value
  //     valueUSD: valueReturnedFromAPIs
  //   })
  // }

  updatedPrice(e) {
    if (e.target.id === 'usd') {
      let newPrice = e.target.value / this.state.currentbtcprice;
      document.getElementById("bitcoin").value = newPrice;
    } else {
      let newPrice = e.target.value * this.state.currentbtcprice
      document.getElementById("usd").value = newPrice;
    }
  }

  render() {
    return (
      <>
        {this.state.error ? <div>Error!</div> : this.state.loading ? <div>Loading...</div> :
          <form >
            <label class="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              BTC:
<input id="bitcoin" type="number" onChange={(e) => this.updatedPrice(e)} />
            </label>


            <label class="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              USD:
<input id="usd" type="number" onChange={(e) => this.updatedPrice(e)} />
            </label>

          </form>
        }


      </>);
  }

}
export default App;
