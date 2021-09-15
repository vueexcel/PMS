import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from 'firebase';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
  if (user) {
    store.dispatch("auth/fetchUser");
  } else {
    store.commit("auth/CLEAR_USER");
  }
})
