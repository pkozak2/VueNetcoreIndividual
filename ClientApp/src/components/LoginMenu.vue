<template>
  <div>
    <ul class="navbar-nav" v-if="isAuthenticated">
      <li class="nav-item">
        <a class="nav-link text-dark" title="Manage">Hello {{ userName }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-dark" title="Logout">Logout</a>
      </li>
    </ul>
    <ul class="navbar-nav" v-if="!isAuthenticated">
      <li class="nav-item">
        <router-link
          class="nav-link text-dark"
          :to="{name: 'Login', params: {action: 'register'}}"
        >Register</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link text-dark"
          :to="{name: 'Login', params: {action: 'login'}}"
        >Login</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import authorizeService from "@/services/AuthorizeService";
export default {
  name: "LoginMenu",
  data() {
    return {
      isAuthenticated: false,
      userName: ""
    };
  },
  mounted() {
    this.populateState();
  },
  methods: {
    async populateState() {
      const [isAuthenticated, user] = await Promise.all([
        authorizeService.isAuthenticated(),
        authorizeService.getUser()
      ]);
      this.isAuthenticated = isAuthenticated;
      this.userName = user && user.name;
    }
  }
};
</script>
