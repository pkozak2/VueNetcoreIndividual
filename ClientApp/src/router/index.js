import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
function importView(name) {
  return () =>
    import(/* webpackChunkName: "v-[request]" */ `../views/${name}.vue`);
}
const routes = [
  {
    path: "/",
    name: "Home",
    component: importView("Home")
  },
  {
    path: "/counter",
    name: "Counter",
    component: importView("Counter")
  },
  {
    path: "/fetch-data",
    name: "FetchData",
    component: importView("FetchData")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: importView("About")
  },
  {
    path: "/authentication/logout/:action",
    name: "Logout",
    props: true,
    component: importView("api-authorization/Logout")
  },
  {
    path: "/authentication/login/:action",
    name: "Login",
    props: true,
    component: importView("api-authorization/Login")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
