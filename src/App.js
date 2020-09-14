import React, { Component } from 'react';
import './App.css';
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();


class App extends Component {
  state = {
    bitcoin: 0,
    usd: 0,
    loading: true,
    currentbtcprice: '',
    error: false
  }

  componentDidMount = async () => {
    let data = await CoinGeckoClient.coins.markets();
    console.log(data)
    this.setState({ currentbtcprice: data.data[0]["current_price"] })
    console.log(this.state.currentbtcprice)
    setTimeout(() => { this.setState({ loading: false }) }, 1500
    )
  }



  render() {

    // if (!this.state.error) {
    //  <div>Error: {this.state.error.message}</div>;

    return (
      <>
        {this.state.loading ? <div>Loading...</div> :
          <form >
            <label class="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              BTC:
<input type="number" value={this.state.btc} onChange={this.convertCurrency} />
            </label>


            <label class="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              USD:
<input id="usd" type="number" value={this.state.usd} />
            </label>

          </form>
        }


      </>);
  }

}



export default App;
