import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { setAxiosHeaders } from "../utils/storage";

import "../scss/components/ProfileRewards.scss";

class ProfileMyRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rewardText: null,
    };
  }
  componentDidMount() {
    console.log("ReactComp ComponentDidlMount rewards");
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "AppSettings/GetRewardsForCustomer")
      .then((response) => {
        this.setState({
          rewardText: response.data,
        });
        console.log(this.state.rewardText)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    console.log("ReactComp ComponentWillUnmount");
  }

  render() {
    return (
      <>
        <Header
          title={"Rewards"}
          history={this.props.history}
          backTo="/profile"
        />
        <div className="ProfileRewards">
          <p>
            We reward your loyalty! Every time you purchase a policy via Money
            Expert you will receive a £20 Amazon voucher.
          </p>
          <p>
            You don’t have to do anything else, when you purchase we
            automatically make a voucher available to you.
          </p>
        </div>

        {! this.state.rewardText &&
          <div className="Profile__box">
            <span style={{ color: "red" }}>
            No rewards
          </span>
          </div>
        }

        { this.state.rewardText &&
          <div>
          {this.state.rewardText.map((value, index) => {
            return (
              <div key={index} className="ProfileRewards__box--padded">
                <div className="YourQuotes__flexItemTitle">
                  {value.RewardTitle + " - " + new Intl.DateTimeFormat('en-GB').format(new Date(value.DateCreated)).split('T')[0]}
                </div>
                <br/><br/>
                <button
                  className="Cta Cta--secondary fade-in step-1"
                  type="submit"
                  disabled={value.CustomerRewardStatus === "Approved" ? true : false}
                >
                  {value.CustomerRewardStatusDescription}
                </button>
              </div>
            )
          })}
          </div>
        }

{/* CustomerId: 5839571
CustomerRewardId: 7
CustomerRewardStatus: null
CustomerRewardStatusDescription: "Approved"
CustomerRewardStatusId: 2
DateCreated: "2020-07-07T00:00:00"
Reward: null
RewardId: 2
RewardTitle: "Amazon" */}

        
        <Footer />
      </>
    );
  }
}

export default ProfileMyRewards;
