import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// Déclaration globales de composants
import MessageRouter from "./components/MessageRouter.vue";
import FormInput from "./components/FormInput.vue";
import Header from './components/Header.vue'

axios.defaults.baseURL = "http://localhost:3000/api/";
const token = sessionStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// Permet d'enregistrer un composant globalement
Vue.component("MessageRouter", MessageRouter);
Vue.component("FormInput", FormInput);
Vue.component("Header", Header);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
