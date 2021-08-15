import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "../Landing";
import Facebook from "../Facebook";
import Google from "../Google";
import Signin from "../Signin";
import Forgotten from "../Forgotten";
import Confirm from "../Confirm";
import Register from "../Register";
import Success from "../Success";
import Homepage from "../Homepage";
import Quotes from "../Quotes";
import Profile from "../Profile";
import ProfileContactPreferences from "../ProfileContactPreferences";
import ProfileMyAlerts from "../ProfileMyAlerts";
import ProfileMyRewards from "../ProfileMyRewards";
import ProfileLegal from "../ProfileLegal";
import ProfileSupport from "../ProfileSupport";

function JourneyHome(props) {
  return (
    <Switch>
      <Route
        exact
        path="/landing"
        render={(renderProps) => <Landing {...renderProps} journey={props.journey} />}
      />
      <Route
        exact
        path="/facebook"
        render={(renderProps) => <Facebook {...renderProps} />}
      />
      <Route
        exact
        path="/google"
        render={(renderProps) => <Google {...renderProps} />}
      />
      <Route
        exact
        path="/signin"
        render={(renderProps) => (
          <Signin {...renderProps} journey={props.journey} />
        )}
      />
      <Route
        exact
        path="/register"
        render={(renderProps) => <Register {...renderProps} journey={props.journey}/>}
      />
      <Route
        exact
        path="/success"
        render={(renderProps) => <Success {...renderProps}  journey={props.journey}/>}
      />
      <Route
        exact
        path="/forgotten"
        render={(renderProps) => <Forgotten {...renderProps}  journey={props.journey} />}
      />
      <Route
        exact
        path="/confirm"
        render={(renderProps) => <Confirm {...renderProps}  journey={props.journey}/>}
      />
      <Route
        exact
        path="/homepage"
        render={(renderProps) => <Homepage {...renderProps} journey={props.journey}/>}
      />
      <Route
        exact
        path="/quotes"
        render={(renderProps) => <Quotes {...renderProps} journey={props.journey}/>}
      />
      <Route
        exact
        path="/profile"
        render={(renderProps) => <Profile {...renderProps} journey={props.journey} />}
      />
      <Route
        exact
        path="/profile"
        render={(renderProps) => <Profile {...renderProps} journey={props.journey} />}
      />
      <Route
        exact
        path="/profile_contact_preferences"
        render={(renderProps) => <ProfileContactPreferences {...renderProps} journey={props.journey} />}
      />
      <Route
        exact
        path="/profile_my_alerts"
        render={(renderProps) => <ProfileMyAlerts {...renderProps} journey={props.journey} />}
      />
      <Route
        exact
        path="/profile_my_rewards"
        render={(renderProps) => <ProfileMyRewards {...renderProps} journey={props.journey} />}
      />
      <Route
        exact
        path="/profile_legal"
        render={(renderProps) => <ProfileLegal {...renderProps} journey={props.journey} />}
      />
      <Route
        exact
        path="/profile_support"
        render={(renderProps) => <ProfileSupport {...renderProps} journey={props.journey} />}
      />
    </Switch>
  );
}

export default JourneyHome;
