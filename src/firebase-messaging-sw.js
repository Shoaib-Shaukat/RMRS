importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
 //databaseURL: “from firebase config”,
 apiKey: "AIzaSyDSfCLHPI9mnw1Yxx4TR1fvYdLfUErDSzI",
 authDomain: "rmrs-customer.firebaseapp.com",
 projectId: "rmrs-customer",
 storageBucket: "rmrs-customer.appspot.com",
 messagingSenderId: "519994687640",
 appId: "1:519994687640:web:a93a63cbc988d9911050ed",
 measurementId: "G-F2V0R9KDCQ"
});
const messaging = firebase.messaging();