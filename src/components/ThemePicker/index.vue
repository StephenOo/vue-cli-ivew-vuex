<template>
  <ColorPicker
    v-model="theme"
    :color="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
  />
</template>

<script>
export default {
  data() {
    return {
      theme: '#409EFF',
    };
  },
};
</script>
