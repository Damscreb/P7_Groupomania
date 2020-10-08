import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import MessageRouter from "./components/MessageRouter.vue"

axios.defaults.baseURL = "http://localhost:3000/api/";
const token = sessionStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

// Permet d'enregistrer un composant globalement
Vue.component('MessageRouter', MessageRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
