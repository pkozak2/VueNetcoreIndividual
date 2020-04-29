<template>
  <div>
    <ul class="navbar-nav" v-if="isAuthenticated">
      <li class="nav-item">
        <router-link
          class="nav-link text-dark"
          :to="{name: 'Authentication', params: { action: 'profile' }}"
        >Hello {{ userName }}</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link text-dark"
          :to="{name: 'Authentication', params: { action: 'logout' }}"
        >Logout</router-link>
      </li>
    </ul>
    <ul class="navbar-nav" v-if="!isAuthenticated">
      <li class="nav-item">
        <router-link
          class="nav-link text-dark"
          :to="{ name: 'Authentication', params: { action: 'register' } }"
        >Register</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link text-dark"
          :to="{ name: 'Authentication', params: { action: 'login' } }"
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
