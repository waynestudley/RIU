import React from "react";
import axios from "axios";

import ComponentBlocker from "./ui/ComponentBlocker";
import { setAxiosHeaders } from "../utils/storage";
import i18n from "../i18n";

import "../scss/components/Hero.scss";

import { ReactComponent as ArrowRight } from "../images/arrow-right.svg";

import { ReactComponent as HomeGasElectricSvg } from "../images/homepage/home_gas_electric.svg";
import { ReactComponent as HomeBroadbandSvg } from "../images/homepage/home_broadband.svg";
import { ReactComponent as HomeHomeInsuranceSvg } from "../images/homepage/home_home_insurance.svg";
import { ReactComponent as HomeCarInsuranceSvg } from "../images/homepage/home_car_insurance.svg";

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlocker: true,
      label0: "",
      link0: null,
      label1: "",
      link1: null,
      label2: "",
      link2: null,
      label3: "",
      link3: null,
    };
  }
  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "AppSettings/GetFeaturedProducts")
      .then((response) => {
        this.setState({
          showBlocker: false,
          label0: response.data[0].Title,
          link0: response.data[0].ApplyUrl,
          label1: response.data[1].Title,
          link1: response.data[1].ApplyUrl,
          label2: response.data[2].Title,
          link2: response.data[2].ApplyUrl,
          label3: response.data[3].Title,
          link3: response.data[3].ApplyUrl,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showBlocker: false });
      });
  }
  render() {
    return (
      <div className={"Hero " + this.props.classList}>
        <h4 className="Hero__heading">{i18n.t("Start your switch today")}</h4>
        <div className="Hero__flexContainer">
          <div className="Hero__flexItem">
            <a href={this.state.link0}>
              <div className="Hero__flexItemTop">
                <div className="Hero__flexItemTopSvg">
                  <HomeGasElectricSvg />
                </div>
              </div>
              <div className="Hero__flexItemBottom">{this.state.label0}</div>
            </a>
          </div>
          <div className="Hero__flexItem">
            <a href={this.state.link1}>
              <div className="Hero__flexItemTop">
                <div className="Hero__flexItemTopSvg">
                  <HomeBroadbandSvg />
                </div>
              </div>
              <div className="Hero__flexItemBottom">{this.state.label1}</div>
            </a>
          </div>
          <div className="Hero__flexItem">
            <a href={this.state.link2}>
              <div className="Hero__flexItemTop">
                <div className="Hero__flexItemTopSvg">
                  <HomeHomeInsuranceSvg />
                </div>
              </div>
              <div className="Hero__flexItemBottom">{this.state.label2}</div>
            </a>
          </div>
          <div className="Hero__flexItem">
            <a href={this.state.link3}>
              <div className="Hero__flexItemTop">
                <div className="Hero__flexItemTopSvg">
                  <HomeCarInsuranceSvg />
                </div>
              </div>
              <div className="Hero__flexItemBottom">{this.state.label3}</div>
            </a>
          </div>
        </div>
        <a href="https://www.moneyexpert.com" className="Hero__siteLink">
          <h3 className="Hero__heading">
            {i18n.t("More on Moneyexpert.com")}
          </h3>
          <ArrowRight />
        </a>
        {this.state.showBlocker === true && <ComponentBlocker />}
      </div>
    );
  }
}

export default Hero;
