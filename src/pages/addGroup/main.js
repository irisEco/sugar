import Vue from "vue";
import App from "./index";
import Fly from "../../utils/api";

const fly = Fly
Vue.prototype.$http = fly;

const app = new Vue(App);
app.$mount();
