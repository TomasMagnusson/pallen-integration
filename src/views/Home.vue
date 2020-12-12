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
import store from "../store/store";

export default {
  name: "Home",
  store,
  components: {
    HelloWorld,
  },
  data: () => ({
    message: 'Hello Vue.js!'
  }),
  mounted: async function() {
      // let response = await fetch(`api/message`);
      // let msg = await response.json();

      // this.message = msg.text;

      this.$store.commit("invoiceConfigModule/storeInvoiceConfig", {creationDate: new Date()});
  }
};
</script>
