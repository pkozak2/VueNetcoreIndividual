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
export default {
  name: "authenticationBase",
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
      return new Component();
    }
  },
  methods: {
    isAction(actions) {
      return Object.values(actions).includes(this.action);
    }
  }
};
</script>