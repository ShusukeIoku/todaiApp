import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faPlus,
  faPenAlt,
  faInfo,
  faHandPaper,
  faDoorOpen,
  faSave,
  faEye,
  faQuestion,
  faSearch,
  faGrin,
  faHeart,
  faChevronUp,
  faChevronDown,
  faDownload,
  faDatabase,
  faCross,
  faTimes,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Toasted from "vue-toasted";
import VueHead from "vue-head";
import Ads from "vue-google-adsense";

Vue.use(require("vue-script2"));
Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);

Vue.use(VueHead, {
  separator: " | "
});

library.add(
  faUser,
  faPlus,
  faPenAlt,
  faInfo,
  faHandPaper,
  faDoorOpen,
  faSave,
  faEye,
  faQuestion,
  faSearch,
  faGrin,
  faHeart,
  faTwitter,
  faChevronUp,
  faChevronDown,
  faDownload,
  faDatabase,
  faTimes,
  faCog
);

Vue.component("fa", FontAwesomeIcon);

Vue.use(firestorePlugin);
Vue.use(Toasted);

firebase.initializeApp({
  apiKey: "AIzaSyBzC1UsJJBYTkpeZMJtQSFIBr1tSG8A9pI",
  authDomain: "todaiapp.firebaseapp.com",
  databaseURL: "https://todaiapp.firebaseio.com",
  projectId: "todaiapp",
  storageBucket: "todaiapp.appspot.com",
  messagingSenderId: "360241228373",
  appId: "1:360241228373:web:e657985af99244db"
});
export const db = firebase.firestore();
export const auth = firebase.auth();

import VueAnalytics from "vue-analytics";

Vue.use(VueAnalytics, {
  id: "UA-XXX-X",
  router
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
