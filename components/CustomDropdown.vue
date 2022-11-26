<template>
  <div class="custom--dropdown-select">
    <a href="#" class="drop--label"></a>
    <div class="dropdown--select"></div>
  </div>
</template>

<script>
export default {
  name: 'CustomDropdown',
  props: {
    dropData: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped></style>
