<template>
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'Home' }">VueIndividual</router-link>
            <button class="navbar-toggler"
                    type="button"
                    aria-label="Toggle navigation"
                    @click="toggle">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse"
                 :class="{ show: expanded }">
                <LoginMenu></LoginMenu>
                <ul class="navbar-nav flex-grow">
                    <li class="nav-item">
                        <router-link class="nav-link text-dark" :to="{ name: 'Home' }">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-dark" :to="{ name: 'Counter' }">Counter</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-dark" :to="{ name: 'FetchData' }">Fetch data</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-dark" :to="{ name: 'About' }">About</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>import LoginMenu from "./LoginMenu";
    export default {
        name: "Toolbar",
        components: { LoginMenu },
        data() {
            return {
                expanded: false
            };
        },
        methods: {
            toggle() {
                this.expanded = !this.expanded;
            }
        }
    };</script>
<style scoped>
    a.navbar-brand {
        white-space: normal;
        text-align: center;
        word-break: break-all;
    }

    html {
        font-size: 14px;
    }

    @media (min-width: 768px) {
        html {
            font-size: 16px;
        }
    }

    .box-shadow {
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
    }
</style>
