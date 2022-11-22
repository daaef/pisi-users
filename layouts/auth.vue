<template>
  <v-app class="auth--app--holder">
    <v-app-bar class="px-7 justify-between" fixed app elevation="0">
      <nuxt-link class="flex items-center" to="/">
        <img src="/auth-logo.png" alt="" />
      </nuxt-link>
      <div class="flex items-center flex-grow-0">
        <nuxt-link
          v-if="$route.name !== 'auth-login'"
          class="flex flex-grow-0 items-center text-sm mr-4"
          to="/auth/login"
        >
          Login
        </nuxt-link>
        <nuxt-link
          v-if="$route.name !== 'auth-signup'"
          to="/auth/signup"
          class="btn btn-primary flex-grow-0"
        >
          <span class="text-white">Create Account</span>
        </nuxt-link>
      </div>
    </v-app-bar>
    <v-main class="flex items-center">
      <v-container class="px-7">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  data() {
    return {
      clipped: false
    }
  }
}
</script>
