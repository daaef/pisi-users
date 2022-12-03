<template>
  <div class="relative custom-input">
    <vs-select v-model="select1" class="selectExample" label="Receive">
      <vs-select-item
        v-for="(item, index) in dropData"
        :key="index"
        :value="item.value"
        :text="item.text"
      />
    </vs-select>
    <div class="flag">
      <span class="fi fi-ng rounded-circle fis"></span>
    </div>
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
  },
  data() {
    return {
      currency: {}
    }
  }
}
</script>

<style scoped></style>
