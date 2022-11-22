<template>
  <div class="dashboard--container">
    <div class="dashboard-view"></div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      users: [
        {
          id: 1,
          name: 'Matthew Ero',
          location: 'Nigeria',
          active: false
        },
        {
          id: 2,
          name: 'Jace Rodman',
          location: 'Nigeria',
          active: false
        },
        {
          id: 3,
          name: 'Tunde Ojigho',
          location: 'Nigeria',
          active: false
        },
        {
          id: 4,
          name: 'Jace Rodman',
          location: 'Nigeria',
          active: false
        },
        {
          id: 5,
          name: 'Jace Rodman',
          location: 'Nigeria',
          active: false
        },
        {
          id: 6,
          name: 'Jace Rodman',
          location: 'Nigeria',
          active: false
        }
      ]
    }
  },
  mounted() {
    this.users = [
      {
        id: 1,
        name: 'Matthew Ero',
        location: 'Nigeria',
        active: false
      },
      {
        id: 2,
        name: 'Jace Rodman',
        location: 'Nigeria',
        active: false
      },
      {
        id: 3,
        name: 'Tunde Ojigho',
        location: 'Nigeria',
        active: false
      },
      {
        id: 4,
        name: 'Jace Rodman',
        location: 'Nigeria',
        active: false
      },
      {
        id: 5,
        name: 'Jace Rodman',
        location: 'Nigeria',
        active: false
      },
      {
        id: 6,
        name: 'Jace Rodman',
        location: 'Nigeria',
        active: false
      }
    ]
    this.getUsers()
  },
  methods: {
    toggleTable(id, i) {
      this.resetActiveState()
      this.users[i].active = true
      this.$router.push(`/dashboard/${id}`)
    },
    resetActiveState() {
      this.users.forEach((user) => (user.active = false))
    },
    async getUsers() {
      await this.$store
        .dispatch('getUsers', {
          createdAtDateStart: '2022-10-19'
        })
        .then((resp) => console.log('resp is', resp))
        .catch((err) => console.log('error', err))
    }
  }
}
</script>
