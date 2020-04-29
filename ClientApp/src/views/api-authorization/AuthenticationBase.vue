<template>
  <component :is="mainComponent" v-bind="{ action }"></component>
</template>
<script>
import {
  LoginActions,
  LogoutActions
} from "../../consts/ApiAuthorizationConstants";
import Login from "./Login";
import Logout from "./Logout";
import WrongAction from "./WrongAction";
export default {
  name: "AuthenticationBase",
  props: {
    action: { type: String, required: true }
  },
  computed: {
    mainComponent() {
      if (this.isAction(LoginActions)) {
        return Login;
      }
      if (this.isAction(LogoutActions)) {
        return Logout;
      }
      return WrongAction;
    }
  },
  methods: {
    isAction(actions) {
      return Object.values(actions).includes(this.action);
    }
  }
};
</script>