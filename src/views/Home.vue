<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>{{ message }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data: () => ({
    message: 'Hello Vue.js!'
  }),
  mounted: async function() {
      let response = await fetch(`api/message`);
      let msg = await response.json();

      this.message = msg.text;
  }
};
</script>
