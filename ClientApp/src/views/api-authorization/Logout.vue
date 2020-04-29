<template>
  <div>{{ message }} | {{ action }}</div>
</template>
<script>
import {
  LogoutActions,
  ApplicationPaths,
  ReturnUrlType
} from "@/consts/ApiAuthorizationConstants";
import authService from "@/services/AuthorizeService";
import { AuthenticationResultStatus } from "@/services/AuthorizeService";
export default {
  name: "Logout",
  props: {
    action: {
      type: String
    }
  },
  data() {
    return {
      message: ""
    };
  },
  mounted() {
    const action = this.action;
    switch (action) {
      case LogoutActions.Logout:
        if (window.history.state.key) {
          this.message = "Processing logout";
          this.logout(this.getReturnUrl());
        } else {
          // This prevents regular links to <app>/authentication/logout from triggering a logout
          this.message = "The logout was not initiated from within the page.";
        }
        break;
      case LogoutActions.LogoutCallback:
        this.message = "Processing logout callback";
        this.processLogoutCallback();
        break;
      case LogoutActions.LoggedOut:
        this.message = "You successfully logged out!";
        break;
      default:
        throw new Error(`Invalid action '${action}'`);
    }
  },
  methods: {
    getReturnUrl(state) {
      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get(ReturnUrlType);
      if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
        // This is an extra check to prevent open redirects.
        throw new Error(
          "Invalid return url. The return url needs to have the same origin as the current page."
        );
      }
      return (
        (state && state.returnUrl) ||
        fromQuery ||
        `${window.location.origin}${ApplicationPaths.LoggedOut}`
      );
    },
    navigateToReturnUrl(returnUrl) {
      return window.location.replace(returnUrl);
    },
    async logout(returnUrl) {
      const state = { returnUrl };
      const isauthenticated = await authService.isAuthenticated();
      if (isauthenticated) {
        const result = await authService.signOut(state);
        switch (result.status) {
          case AuthenticationResultStatus.Redirect:
            break;
          case AuthenticationResultStatus.Success:
            await this.navigateToReturnUrl(returnUrl);
            break;
          case AuthenticationResultStatus.Fail:
            this.message = result.message;
            break;
          default:
            throw new Error("Invalid authentication result status.");
        }
      } else {
        this.message = "You successfully logged out!";
      }
    },
    async processLogoutCallback() {
      const url = window.location.href;
      const result = await authService.completeSignOut(url);
      switch (result.status) {
        case AuthenticationResultStatus.Redirect:
          // There should not be any redirects as the only time completeAuthentication finishes
          // is when we are doing a redirect sign in flow.
          throw new Error("Should not redirect.");
        case AuthenticationResultStatus.Success:
          await this.navigateToReturnUrl(this.getReturnUrl(result.state));
          break;
        case AuthenticationResultStatus.Fail:
          this.message = result.message;
          //this.setState({ message: result.message });
          break;
        default:
          throw new Error("Invalid authentication result status.");
      }
    }
  }
};
</script>
