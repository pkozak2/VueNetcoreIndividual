export const ApplicationName = "auth";

export const ReturnUrlType = "returnUrl";

export const QueryParameterNames = {
  ReturnUrl: ReturnUrlType,
  Message: "message"
};

export const LogoutActions = {
  LogoutCallback: "logout-callback",
  Logout: "logout",
  LoggedOut: "logged-out"
};

export const LoginActions = {
  Login: "login",
  LoginCallback: "login-callback",
  LoginFailed: "login-failed",
  Profile: "profile",
  Register: "register"
};

const prefix = "/authentication";
const login = "/login";
const logout = "/logout";

export const ApplicationPaths = {
  DefaultLoginRedirectPath: "/",
  ApiAuthorizationClientConfigurationUrl: `/_configuration/${ApplicationName}`,
  ApiAuthorizationPrefix: prefix,
  Login: `${prefix}/${login}/${LoginActions.Login}`,
  LoginFailed: `${prefix}/${login}/${LoginActions.LoginFailed}`,
  LoginCallback: `${prefix}/${login}/${LoginActions.LoginCallback}`,
  Register: `${prefix}/${login}/${LoginActions.Register}`,
  Profile: `${prefix}/${login}/${LoginActions.Profile}`,
  LogOut: `${prefix}/${logout}/${LogoutActions.Logout}`,
  LoggedOut: `${prefix}/${logout}/${LogoutActions.LoggedOut}`,
  LogOutCallback: `${prefix}/${logout}/${LogoutActions.LogoutCallback}`,
  IdentityRegisterPath: "/Identity/Account/Register",
  IdentityManagePath: "/Identity/Account/Manage"
};
