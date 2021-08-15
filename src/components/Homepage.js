import React from "react";
import firebase from'firebase';
import Header from "./Header";
import Footer from "./Footer";
import Onboarding from "./Onboarding";
import Hero from "./Hero";
import YourQuotes from "./YourQuotes";

import { getStorage, setStorage } from "../utils/storage";

import "../scss/components/Homepage.scss";

class Homepage extends React.Component {
  constructor() {
    super();
    let value = getStorage("Homepage.showOnboarding");
    if (value === null || value === false) {
      this.state = { showOnboarding: true };
    } else {
      this.state = { showOnboarding: false };
    }

    const firebaseConfig = {
      apiKey: "AIzaSyClxR-04uc10TGp73mboHe1ab6XyEFx37o",
      authDomain: "mexapp-27b15.firebaseapp.com",
      databaseURL: "https://mexapp-27b15.firebaseio.com",
      projectId: "mexapp-27b15",
      storageBucket: "mexapp-27b15.appspot.com",
      messagingSenderId: "785127306199",
      appId: "1:785127306199:web:d371566a10562c764b5192",
      measurementId: "G-GXQKLPGVE7"
    };


    // navigator.serviceWorker
    //     .register("firebase-messaging-sw.js")
    //     .then(function(registration) {
    //       console.log("Registration successful, scope is:", registration.scope);
    //     })
    //     .catch(function(err) {
    //       console.log("Service worker registration failed, error:", err);
    //     });

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    // const messaging = firebase.messaging();

    // messaging.requestPermission()
    // .then(function() {
    //   console.log('Permission granted')
    //   return messaging.getToken()
    // })
    // .then(function(token) {
    //   console.log("token: ", token)
    // })
    // .catch(function(err) {
    //   console.log('Error occured: ', err)
    // })

    

    



    // var key = 'AAAAts0789c:APA91bEo6oq2W-WY8seWb_o4Ycju7AFQN5J6WgKERMfdunx2HQOGYQBb071TogpsKUyDpDgeJU31-1Nr-IgxK4sOWsLh7lWTCUafeIki2ZUeIfdgub2-qLlaJh2dgf0cwcJc8zUdjNso';
    // var to = 'eXYmkcEZOFuptUFdgvFqHX:APA91bHDTN9UqJ8WwOhuUcy8Xq-QVS27qDJhknhsNIIDziugYilzRpg33Lgb8Ls2t5mukZO_MJ0WnSAOhtuJ3aZqQmhJKKX3CAzFI8Xd6nYYrdSiOepN1S_gyjrtmX7MAs8gKAqmAXfc';
    // var notification = {
    //   'title': 'Portugal vs. Denmark',
    //   'body': '5 to 11',
    //   'icon': 'firebase-logo.png',
    //   'click_action': 'http://localhost:8081'
    // };

    // fetch('https://fcm.googleapis.com/fcm/send', {
    //   'method': 'POST',
    //   'headers': {
    //     'Authorization': 'key=' + key,
    //     'Content-Type': 'application/json'
    //   },
    //   'body': JSON.stringify({
    //     'notification': notification,
    //     'to': to
    //   })
    // }).then(function(response) {
    //   console.log("Response::: ", response);
    // }).catch(function(error) {
    //   console.error(error);
    // })

    // messaging.onMessage((payload) => {
    //   console.log('Message received:: ', payload);
    // });

    // client Firebase token - work PC
    // eXYmkcEZOFuptUFdgvFqHX:APA91bHDTN9UqJ8WwOhuUcy8Xq-QVS27qDJhknhsNIIDziugYilzRpg33Lgb8Ls2t5mukZO_MJ0WnSAOhtuJ3aZqQmhJKKX3CAzFI8Xd6nYYrdSiOepN1S_gyjrtmX7MAs8gKAqmAXfc

  }
  hideOnboarding = () => {
    setStorage("Homepage.showOnboarding", false);
    this.setState({ showOnboarding: false });
  };

  render() {
    return (
      <>
        {this.state.showOnboarding && (
          <Onboarding goNext={this.hideOnboarding} />
        )}
        {!this.state.showOnboarding && (
          <>
            <Header
              title="Money Expert"
              history={this.props.history}
              showBack={false}
            />
            <div className="Homepage">
              <Hero classList="fade-in step-0" journey={this.props.journey} />
              <YourQuotes
                classList="fade-in step-1"
                journey={this.props.journey}
              />
              <Footer />
            </div>
          </>
        )}
      </>
    );
  }
}

export default Homepage;
