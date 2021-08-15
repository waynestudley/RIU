import React from "react";
import axios from "axios";
import { getStorage, setAxiosHeaders, setStorage } from "../utils/storage";

import LoadingSpinner from "./ui/LoadingSpinner";

class Results extends React.Component {
  constructor() {
    super();
    this.state = { packageData: null };
  }
  componentDidMount() {
    setAxiosHeaders();
    /*
CanHaveVirgin: null
CountryId: 2
CurrentMediaPackageBroadband: "true"
CurrentMediaPackagePhone: null
CurrentMediaPackageTV: "true"
CurrentMonthlyPay: "500"
CurrentProviderId: "-1"
CurrentProviderMonths: null
CurrentStreamServicesNetflix: null
CurrentStreamServicesNowTV: null
CurrentStreamServicesPrime: null
CurrentTVPackagesEntertainment: null
CurrentTVPackagesMovies: null
CurrentTVPackagesSports: null
HasAerial: null
NumDevicesHighUse: "17"
NumDevicesLowUse: "0"
NumDevicesMediumUse: "0"
Postcode: "01002"
*/
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
    };
    axios
      .post(this.props.journey.api + "Media/Quote", postData)
      .then((response) => {
        this.setState({ packageData: response.data });
        /*
        let dataArray = response.data.reverse();
        let bestPackage = response.data[0];
        let fullPackage = response.data.slice(-1)[0];

        this.setState({
          showResults: true,
          fulldata: response.data,
          data: dataArray,
          bestPackage: bestPackage,
          bestPackageProvider: bestPackage.MediaProvider,
          bestPackageId: bestPackage.Id,
          fullPackage: fullPackage,
          fullPackageProvider: fullPackage.MediaProvider,
          fullyLoadedPackageId: fullPackage.Id,
          LoadingPackages: false,
        });
        */
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  selectPackage = (e, packageId, bestPackage) => {
    e.preventDefault();
    //console.log('packageId',packageId);
    setStorage("Quote.SelectedPackageId",packageId)
    /*
    localStorage.setItem("Quote.PerfectPackage", bestPackage);
    localStorage.setItem("Quote.SuperCard", this.state.SuperCard);
    */
    this.goNextRoute();
  }

  render() {
    return (
      <div className="Results">
        <h2>Results</h2>
        {this.state.packageData === null && (
          <LoadingSpinner/>
        )}
        {this.state.packageData !== null &&
          this.state.packageData.map((item, i) => (
            <div className="" key={"key" + i}>
              {/*console.log(item)*/}
              {item.PackageName}
              <button onClick={(e) => this.selectPackage(e, item.Id, null)}>
                Order
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default Results;
