<template>
  <div id="app">
    <regionalTree></regionalTree>
  </div>
</template>

<script>
import regionalTree from "./compontent/regionalTree";
export default {
  name: "app",
  components: {
    regionalTree
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
