import React from "react";
import axios from "axios";
import { Trans } from "react-i18next";
import { getStorage, setAxiosHeaders } from "../utils/storage";

import LoadingSpinner from "./ui/LoadingSpinner";

import "../scss/components/PackageSummary.scss";

class PackageSummary extends React.Component {
  constructor() {
    super();
    this.state = { packageData: null };
  }

  componentDidMount() {
    setAxiosHeaders();

    let postData = {
      Postcode: getStorage("Quote.postcode"),
      CurrentProviderId: getStorage("Quote.currentProviderId"),
      CurrentProviderMonths: getStorage("Quote.currentProviderMonths"),

      CurrentMediaPackageBroadband: getStorage("Quote.broadbandCheck"),
      CurrentMediaPackagePhone: getStorage("Quote.phoneCheck"),
      CurrentMediaPackageTV: getStorage("Quote.smartTVCheck"),

      CurrentTVPackagesMovies: getStorage("Quote.moviesCheck"),
      CurrentTVPackagesSports: getStorage("Quote.sportsCheck"),
      CurrentTVPackagesEntertainment: getStorage("Quote.entertainmentCheck"),

      CurrentStreamServicesNetflix: getStorage("Quote.netflixCheck"),
      CurrentStreamServicesPrime: getStorage("Quote.primeCheck"),
      CurrentStreamServicesNowTV: getStorage("Quote.nowCheck"),

      NumDevicesHighUse: getStorage("Quote.numDevicesHighUse"),
      NumDevicesMediumUse: getStorage("Quote.numDevicesMediumUse"),
      NumDevicesLowUse: getStorage("Quote.numDevicesLowUse"),

      CurrentMonthlyPay: getStorage("Quote.currentMonthlyPayment"),
      HasAerial: getStorage("Quote.aerial"),
      CanHaveVirgin: getStorage("Quote.canHaveVirgin"),
      CountryId: this.props.journey.countryId,

      SelectedPackageId: getStorage("Quote.SelectedPackageId"),
    };
    //postData = { SelectedPackageId: getStorage("Quote.currentProviderId"), CountryId: 2 };
    /*
    axios.post(process.env.REACT_APP_API + 'Media/Quote',
            {
                "Postcode": this.state.Postcode,
                "CurrentProviderId": this.state.CurrentProviderId,
                "CurrentProviderMonths": this.state.CurrentProviderMonths,

                "CurrentMediaPackageBroadband": this.state.Broadband,
                "CurrentMediaPackagePhone": this.state.Phone,
                "CurrentMediaPackageTV": this.state.TV,

                "CurrentTVPackagesMovies": this.state.Movies,
                "CurrentTVPackagesSports": this.state.Sports,
                "CurrentTVPackagesEntertainment": this.state.Entertainment,

                "CurrentStreamServicesNetflix": this.state.Netflix,
                "CurrentStreamServicesPrime": this.state.Prime,
                "CurrentStreamServicesNowTV": this.state.NowTV,

                "NumDevicesHighUse": this.state.HighUse,
                "NumDevicesMediumUse": this.state.MediumUse,
                "NumDevicesLowUse": this.state.LowUse,

                "CurrentMonthlyPay": this.state.CurrentMonthlyPay,
                "HasAerial": this.state.Aerial,
                "CanHaveVirgin": this.state.CanHaveVirgin,

                "SelectedPackageId": this.state.passed_id,
                "CountryId": 2
            })
            .then(response => {

                //console.log(response.data);

                this.setState({ data: response.data[0] });
                this.setState({ exitFee: response.data[0].CoversCurrentExitFeeAmount });
                this.setState({ media_provider: response.data[0].MediaProvider });
                this.setState({ checker_url: response.data[0].MediaProvider.AvailabilityCheckerURL });
                this.setState({ media_features: response.data[0].MediaFeatures });
            });
    */

    axios
      .post(this.props.journey.api + "Media/Quote", postData)
      .then((response) => {
        this.setState({ packageData: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  render() {
    let publicUrl = "";
    return (
      <div className="PackageSummary">
        {this.state.packageData === null && (
          <LoadingSpinner/>
        )}
        {this.state.packageData !== null &&
          this.state.packageData.map((item, i) => (
            <div className="PackageSummary__overview" key={"key" + i}>
              <div>
                <div className="PackageSummary__tableHeading">
                  <h2>
                    <Trans i18nKey="PackageSummaryOverviewHeading">{" "}</Trans>
                  </h2>
                </div>
                <div>
                  <div className="PackageSummary__tr">
                    <div className="PackageSummary__td">
                      <img
                        src={
                          publicUrl +
                          "/imagesPackage/" +
                          item.MediaProvider.ProviderLogo
                        }
                        alt="Logo"
                      />
                    </div>
                    <div className="PackageSummary__td">
                      <div>
                        {item.MediaProvider.ProviderName}
                        <br />
                        {item.PackageName}
                      </div>
                      <div className="perfect-package-speed">
                        <strong>{item.MaxSpeed} Mb/s </strong>maximum download
                        speed
                      </div>
                    </div>
                  </div>
                  <div className="PackageSummary__tr">
                    <div className="PackageSummary__td">Monthly cost</div>
                    <div className="PackageSummary__td">
                      {this.props.journey.currency + item.MonthlyCost}
                    </div>
                  </div>
                  <div className="PackageSummary__tr">
                    <div className="PackageSummary__td">Data Allowance</div>
                    <div className="PackageSummary__td">
                      {item.DataAllowanceDesc}
                    </div>
                  </div>
                  <div className="PackageSummary__tr">
                    <div className="PackageSummary__td">Contract Length</div>
                    <div className="PackageSummary__td">
                      {item.ContractLengthMonths + " Months"}
                    </div>
                  </div>
                  <div className="PackageSummary__tr">
                    <div className="PackageSummary__td">Fixed Price Months</div>
                    <div className="PackageSummary__td">
                      {this.props.journey.currency + item.FixedPriceMonths}
                    </div>
                  </div>
                  <div className="PackageSummary__tr">
                    <div className="PackageSummary__td">Setup Fee</div>
                    <div className="PackageSummary__td">
                      {this.props.journey.currency + item.SetupFee}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="PackageSummary__tableHeading">
                  <h3>
                    <Trans i18nKey="PackageSummarySummaryHeading">{" "}</Trans>
                  </h3>
                </div>
                <div className="PackageSummaryTR">
                  {item.MediaFeatures.map((feature, idx) => (
                    <h3 key={'key2'+idx}>{feature.AddOnType.Name}</h3>
                  ))}
                </div>
              </div>
            </div>
          ))}
        <button onClick={this.goNextRoute}>
          <Trans i18nKey="Continue">{" "}</Trans>
        </button>
      </div>
    );
  }
}

export default PackageSummary;
