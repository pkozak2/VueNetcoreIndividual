<template>
  <div>{{ message }}</div>
</template>
<script>
import authService from "@/services/AuthorizeService";
import { AuthenticationResultStatus } from "@/services/AuthorizeService";
import {
  LoginActions,
  QueryParameterNames,
  ApplicationPaths,
  ReturnUrlType
} from "@/consts/ApiAuthorizationConstants";
export default {
  name: "Login",
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
      case LoginActions.Login:
        this.message = "Processing login";
        this.login(this.getReturnUrl());
        break;
      case LoginActions.LoginCallback:
        this.message = "Processing login callback";
        this.processLoginCallback();
        break;
      case LoginActions.LoginFailed:
        var params = new URLSearchParams(window.location.search);
        var error = params.get(QueryParameterNames.Message);
        this.message = error;
        break;
      case LoginActions.Profile:
        this.redirectToProfile();
        break;
      case LoginActions.Register:
        this.redirectToRegister();
        break;
      default:
        throw new Error(`Invalid action '${action}'`);
    }
  },
  methods: {
    async login(returnUrl) {
      const state = { returnUrl };
      const result = await authService.signIn(state);
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
          throw new Error(`Invalid status result ${result.status}.`);
      }
    },
    async processLoginCallback() {
      const url = window.location.href;
      const result = await authService.completeSignIn(url);
      switch (result.status) {
        case AuthenticationResultStatus.Redirect:
          // There should not be any redirects as the only time completeSignIn finishes
          // is when we are doing a redirect sign in flow.
          throw new Error("Should not redirect.");
        case AuthenticationResultStatus.Success:
          await this.navigateToReturnUrl(this.getReturnUrl(result.state));
          break;
        case AuthenticationResultStatus.Fail:
          //this.setState({ message: result.message });
          this.message = result.message;
          break;
        default:
          throw new Error(
            `Invalid authentication result status '${result.status}'.`
          );
      }
    },
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
        ApplicationPaths.DefaultLoginRedirectPath
      );
    },
    redirectToRegister() {
      this.redirectToApiAuthorizationPath(
        `${ApplicationPaths.IdentityRegisterPath}?${
          QueryParameterNames.ReturnUrl
        }=${encodeURI(ApplicationPaths.Login)}`
      );
    },
    redirectToProfile() {
      this.redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
    },
    redirectToApiAuthorizationPath(apiAuthorizationPath) {
      const redirectUrl = `${window.location.origin}${apiAuthorizationPath}`;
      // It's important that we do a replace here so that when the user hits the back arrow on the
      // browser he gets sent back to where it was on the app instead of to an endpoint on this
      // component.
      window.location.replace(redirectUrl);
    },
    navigateToReturnUrl(returnUrl) {
      // It's important that we do a replace here so that we remove the callback uri with the
      // fragment containing the tokens from the browser history.
      window.location.replace(returnUrl);
    }
  }
};
</script>
