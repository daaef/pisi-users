<template>
  <div class="action--navigation">
    <vs-button>Create sell offer</vs-button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      activeItem: 0,
      active: false
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
