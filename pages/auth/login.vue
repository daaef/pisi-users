<template>
  <div class="auth--view flex justify-center">
    <div class="card auth--card bg-base-100/40 backdrop-blur">
      <div class="card-body items-center">
        <h2 class="card-title text-center font-medium text-h5">
          Log in to get started
        </h2>
        <div class="w-full mt-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-lg">Email</span>
            </label>
            <input
              v-model="login.email"
              type="email"
              placeholder="joe@gmail.com"
              class="input bg-base-content/10 input-bordered w-full"
            />
          </div>
        </div>
        <div class="w-full mt-3">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text text-lg">Password</span>
            </label>
            <div class="relative">
              <input
                v-model="login.password"
                :type="show ? 'text' : 'password'"
                placeholder="**********"
                class="input bg-base-content/10 input-bordered w-full"
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <i
                  class="iconly-Show icbo text-primary"
                  :class="{ hidden: show, block: !show }"
                  @click="show = !show"
                ></i>
                <i
                  class="iconly-Hide icbo text-primary"
                  :class="{ block: show, hidden: !show }"
                  @click="show = !show"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-end">
          <nuxt-link to="/forgot">Forgot password</nuxt-link>
        </div>
        <div class="w-full mt-5">
          <!--          <button
            class="w-full btn btn-primary flex items-center"
            :class="loading ? 'loading' : ''"
            @click.prevent="userLogin"
          >
            <span>Log in</span> <ic name="Arrow-Right" />
          </button>-->
          <nuxt-link class="w-full btn btn-primary flex items-center" to="/">
            <span>Log in</span> <ic name="Arrow-Right" />
          </nuxt-link>
        </div>
        <div class="w-full mt-5">
          <p class="text-center">
            By clicking continue, you agree to Exchange's
            <a href="#">Terms of Service</a> and
            <a href="#">Privacy Policy.</a>
          </p>
        </div>
      </div>
    </div>
    <v-snackbar :timeout="-1" :value="message" absolute left shaped top>
      {{ notification }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  layout: 'auth',
  auth: 'guest',
  data() {
    return {
      show: false,
      loading: false,
      message: false,
      notification: '',
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      this.loading = true
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login
        })
        console.log('Response is', response.data)
        this.notification = response.data.data.msg
        this.message = true
        this.$auth.setUser(response.data.data.user)
        this.$auth.setUserToken(response.data.data.accessToken).then(() =>
          this.$toast.success('User set!', {
            theme: 'bubble',
            position: 'top-right',
            duration: 1000
          })
        )
        this.loading = false
      } catch (err) {
        console.log('We got an error folks', err)
        this.loading = false
      }
    }
  }
}
</script>
