import Vue from "vue";
import VueLazyload from "vue-lazyload";


Vue.use(VueLazyload, {
  preLoad: true,
  attempt: true
});