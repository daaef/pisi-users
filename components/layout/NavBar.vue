<template>
  <div class="action--navigation">
    <vs-button @click="dialog = true">Create sell offer</vs-button>
    <MakeOffer @closeModal="dialog = false" :dialog="dialog" />
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      activeItem: 0,
      dialog: false
    }
  }
}
</script>
<style>
.action--navigation {
  padding-left: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: calc(100% - 260px);
}
</style>
