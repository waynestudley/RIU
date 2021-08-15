

  importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyClxR-04uc10TGp73mboHe1ab6XyEFx37o",
    authDomain: "mexapp-27b15.firebaseapp.com",
    databaseURL: "https://mexapp-27b15.firebaseio.com",
    projectId: "mexapp-27b15",
    storageBucket: "mexapp-27b15.appspot.com",
    messagingSenderId: "785127306199",
    appId: "1:785127306199:web:d371566a10562c764b5192",
    measurementId: "G-GXQKLPGVE7"
  };
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function (payload) {
    console.log('Handling background message ', payload);
  
    return self.registration.showNotification(payload.data.title, {
      body: payload.data.body,
      icon: payload.data.icon,
      tag: payload.data.tag,
      data: payload.data.link
    });
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(self.clients.openWindow(event.notification.data));
  });