<template>
  <v-app>
    <v-main>
      <LayoutSideBar />
      <div class="flex flex-col">
        <LayoutNavBar />
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      active: false
    }
  },
  methods: {
    async logout() {
      this.loading = true
      try {
        const response = await this.$auth.logout()
        console.log('response is', response)
        this.loading = false
      } catch (err) {
        console.log('We got an error folks', err)
        this.loading = false
      }
    }
  }
}
</script>
<style>
.v-main__wrap {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.vs-sidebar--footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-bottom: 20px;
}
</style>
