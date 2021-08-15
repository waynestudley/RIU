import React from "react";
import axios from "axios";
import ComponentBlocker from "./ui/ComponentBlocker";
import { setAxiosHeaders } from "../utils/storage";

import "../scss/components/YourQuotes.scss";

import { ReactComponent as HomeGasElectricSvg } from "../images/homepage/home_gas_electric.svg";
import { ReactComponent as HomeBroadbandSvg } from "../images/homepage/home_broadband.svg";
import { ReactComponent as HomeHomeInsuranceSvg } from "../images/homepage/home_home_insurance.svg";
import { ReactComponent as HomeCarInsuranceSvg } from "../images/homepage/home_car_insurance.svg";

//https://testapi.moneyexpert.com/api/AppSettings/GetQuoteHistory

class YourQuotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlocker: true,
      filter: 'All'
    };
  }
  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "AppSettings/GetQuoteHistory")
      .then((response) => {
        this.setState({
          quoteList: response.data,
          loadedQuoteList: response.data,
          showBlocker: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showBlocker: false });
      });
  }

  handleClickActiveTab(e) {
    switch(e) {
      case 1:
        this.setState({
          filter: 'All',
          quoteList: this.state.loadedQuoteList});
        break;
      case 2:
        this.setState({
          filter: 'Utils',
          quoteList: this.state.loadedQuoteList.filter(type => type.ProductCategoryId === 40)
        });
        break;
      case 3:
        this.setState({
          filter: 'Bb',
          quoteList: this.state.loadedQuoteList.filter(type => type.ProductCategoryId === 41)
        });
        break;
      case 4:
        this.setState({
          filter: 'Home',
          quoteList: this.state.loadedQuoteList.filter(type => type.ProductCategoryId === 42)
        });
        break;
      case 5:
        this.setState({
          filter: 'Car',
          quoteList: this.state.loadedQuoteList.filter(type => type.ProductCategoryId === 43)
        });
        break;
        default:
      this.setState({
        filter: 'All',
        quoteList: this.state.loadedQuoteList
      });
    }
  }


  render() {
    return (
      <div className={"YourQuotes " + this.props.classList}>
        { this.state.quoteList && this.state.quoteList.length > 0 ? (
          <h4 className="YourQuotes__heading">Your Quotes</h4>
        ) : (
          <h4 className="YourQuotes__heading">No quotes to display</h4>
        )
        }

        <div className="YourQuotes__selectorContainer">
          <div className={`YourQuotes__selectorItem${this.state.filter === "All" ? "Active" : ''}`} onClick= 
             {this.handleClickActiveTab.bind(this, 1)}>
            All
          </div>
          <div className={`YourQuotes__selectorItem${this.state.filter === "Utils" ? "Active" : ''}`} onClick= 
             {this.handleClickActiveTab.bind(this, 2)}>
            Utilities
          </div>
          <div className={`YourQuotes__selectorItem${this.state.filter === "Bb" ? "Active" : ''}`} onClick= 
             {this.handleClickActiveTab.bind(this, 3)}>
            Broadband

          </div>
          <div className={`YourQuotes__selectorItem${this.state.filter === "Home" ? "Active" : ''}`} onClick= 
             {this.handleClickActiveTab.bind(this, 4)}>
            Home
          </div>
          <div className={`YourQuotes__selectorItem${this.state.filter === "Car" ? "Active" : ''}`} onClick= 
             {this.handleClickActiveTab.bind(this, 5)}>
            Car
          </div>
        </div>

        <div className="YourQuotes__flexContainer">
        { this.state.quoteList &&
          <div style={{width: "100%"}}>
          {this.state.quoteList.map((quote, index) => {
            return (
              <div className="YourQuotes__flexItem" key={index}>
                {this.state.filter === "All" && (
                    
               
                <div className="YourQuotes__flexItemTop">
                  <div className="YourQuotes__flexItemIcon">
                    {quote.ProductCategoryId === 40 && (
                      <HomeGasElectricSvg />
                    )}
                    {quote.ProductCategoryId === 41 && (
                      <HomeBroadbandSvg />
                    )}
                    {quote.ProductCategoryId === 42 && (
                      <HomeHomeInsuranceSvg />
                    )}
                    {quote.ProductCategoryId === 43 && (
                      <HomeCarInsuranceSvg />
                    )}
                  </div>

                  <div className="YourQuotes__flexItemTitle">
                    {quote.ProductCategoryId === 40 && (
                      <div>Utilities quote</div>
                    )}
                    {quote.ProductCategoryId === 41 && (
                      <div>Broadband quote</div>
                    )}
                    {quote.ProductCategoryId === 42 && (
                      <div>Home Insurance quote</div>
                    )}
                    {quote.ProductCategoryId === 43 && (
                      <div>Car Insurance quote</div>
                    )}
                  </div>
                </div>
                 )}

                
                
                {this.state.filter === "All" && (
                    <div className="YourQuotes__flexItemDivider"></div>
                )}

                <div className="YourQuotes__flexItemBottom">
                  {quote.Logo && (
                    <img src={require(`../images/${quote.Logo}`)} alt="logo"/>
                  )}
                  {quote.MonthlySpend && (
                    <div className="YourQuotes__Cost">
                      Cost
                      <br />
                      £{quote.MonthlySpend.toFixed(2)}
                    </div>
                  )}
                  {quote.ProductCategoryId === 43 && (
                    <div>
                      Reg
                      <br />
                      {quote.CarRegistration}
                    </div>
                  )}
                  {quote.SwitchAnniversaryDate && (
                  <div className="YourQuotes__Expires">
                    Expires
                    <br/>
                    {new Intl.DateTimeFormat('en-GB').format(new Date(quote.SwitchAnniversaryDate)).split('T')[0]}  
                  </div>
                  )}
                </div>
              </div>
            )
          })}
          </div>
        }
         
        </div>
        {this.state.showBlocker === true && <ComponentBlocker />}
      </div>
    );
  }
}

export default YourQuotes;
