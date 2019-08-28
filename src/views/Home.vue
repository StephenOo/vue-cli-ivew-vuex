<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Button type="info">info</Button>
    <svg-icon icon-class='soccer'/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
