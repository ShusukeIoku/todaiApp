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
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Toasted from "vue-toasted";

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
  faDownload
);

Vue.component("fa", FontAwesomeIcon);

Vue.use(firestorePlugin);
Vue.use(Toasted);

firebase.initializeApp({
  apiKey: "AIzaSyATUJHvu4ajMHACmN4AADVtZPW6ZERcFic",
  authDomain: "alpha-class-project.firebaseapp.com",
  databaseURL: "https://alpha-class-project.firebaseio.com",
  projectId: "alpha-class-project",
  storageBucket: "",
  messagingSenderId: "445554561949",
  appId: "1:445554561949:web:7024cc4c49e23b70"
});
export const db = firebase.firestore();
export const auth = firebase.auth();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
