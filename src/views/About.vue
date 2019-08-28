<template>
  <div class="about">
    <h1>This is an about page</h1>
    <section class="svg-container">
      <svg-soccer></svg-soccer>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '韩二虎',
    };
  },
};
</script>
<style scoped>
.svg-container {
  color: aquamarine;
}
</style>
