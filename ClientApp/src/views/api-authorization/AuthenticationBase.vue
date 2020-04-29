<template>
  <component :is="mainComponent" v-bind="{ action }"></component>
</template>
<script>
import Vue from "vue";
import {
  LoginActions,
  LogoutActions
} from "../../consts/ApiAuthorizationConstants";
import Login from "./Login";
import Logout from "./Logout";
export default {
  name: "AuthenticationBase",
  props: {
    action: { type: String, required: true }
  },
  components: { Login, Logout },
  computed: {
    mainComponent() {
      if (this.isAction(LoginActions)) {
        return Login;
      }
      if (this.isAction(LogoutActions)) {
        return Logout;
      }
      return Vue.Component();
    }
  },
  methods: {
    isAction(actions) {
      return Object.values(actions).includes(this.action);
    }
  }
};
</script>