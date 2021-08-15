import React from "react";

import Cta from "./ui/Cta";
import Dots from "./ui/Dots";

import "../scss/components/Onboarding.scss";

import { ReactComponent as WelcomeSvg } from "../images/onboarding/welcome.svg";
import { ReactComponent as MoneySvg } from "../images/onboarding/money.svg";
import { ReactComponent as CalendarSvg } from "../images/onboarding/calendar.svg";
import { ReactComponent as NotifictionSvg } from "../images/onboarding/notification.svg";
import { ReactComponent as AmazonSvg } from "../images/onboarding/amazon.svg";

function OnboardingCard(props) {
  return (
    <div className="Onboarding__card slide-in step-1">
      <h1 className="Onboarding__heading fade-in step-0">{props.heading}</h1>
      <p className="Onboarding__copy fade-in step-1">{props.copy}</p>
      <div className="Onboarding__icon fade-in step-2">{props.icon}</div>
      <Cta
        label="Next"
        skin="secondary"
        classList="Onboarding__cta fade-in step-3"
        handleClick={props.primaryCtaClick}
      />
      <div className="Onboarding__dots fade-in step-4">
        <Dots currentDot={props.currentDot} totalDots={props.totalDots} />
      </div>
    </div>
  );
}

class Onboarding extends React.Component {
  constructor() {
    super();
    this.state = { current: 0 };
  }
  slideInNextCard = () => {
    this.setState({ current: this.state.current + 1 });
  };
  render() {
    return (
      <div className="Onboarding">
        {this.state.current === 0 && (
          <OnboardingCard
            heading="Welcome to Money&nbsp;Expert"
            copy="Get a better price for gas and electricity, insurance, broadband and more"
            icon={<WelcomeSvg />}
            primaryCta="cta"
            primaryCtaClick={this.slideInNextCard}
            secondaryCta={null}
            secondaryCtaClick={null}
            currentDot={0}
            totalDots={5}
          />
        )}

        {this.state.current === 1 && (
          <OnboardingCard
            heading="Never miss out on a deal"
            copy="View your current quotes and ensure you stay on the best deal with our auto-switching service"
            icon={<MoneySvg />}
            primaryCta="cta"
            primaryCtaClick={this.slideInNextCard}
            secondaryCta="cta"
            secondaryCtaClick={null}
            currentDot={1}
            totalDots={5}
          />
        )}

        {this.state.current === 2 && (
          <OnboardingCard
            heading="Helpful reminders"
            copy="Don’t miss an expiry date ever again, set up an alert"
            icon={<CalendarSvg />}
            primaryCta="cta"
            primaryCtaClick={this.slideInNextCard}
            secondaryCta="cta"
            secondaryCtaClick={null}
            currentDot={2}
            totalDots={5}
          />
        )}

        {this.state.current === 3 && (
          <OnboardingCard
            heading="Rewards to get you going"
            copy="Get a £20 Amazon voucher for every policy you buy"
            icon={<AmazonSvg />}
            primaryCta="cta"
            primaryCtaClick={this.slideInNextCard}
            secondaryCta="cta"
            secondaryCtaClick={null}
            index={this.state.current}
            currentDot={3}
            totalDots={5}
          />
        )}

        {this.state.current === 4 && (
          <OnboardingCard
            heading="Notifications"
            copy="Let us keep you informed about new opportunities to save money on your household costs. You can change your preference at any time from your profile page."
            icon={<NotifictionSvg />}
            primaryCta="cta"
            primaryCtaClick={this.props.goNext}
            secondaryCta="cta"
            secondaryCtaClick={null}
            currentDot={4}
            totalDots={5}
          />
        )}
      </div>
    );
  }
}

export default Onboarding;
