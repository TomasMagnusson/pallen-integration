<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>{{ creationDate }}</div>
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
    message: "Hello!",
  }),
  mounted: async function () {
    let response = await fetch(`api/message`);
    let msg = await response.json();

    this.message = msg.text;

    console.log("Home - mounted!");

    // this.$store.commit("invoiceConfigModule/storeInvoiceConfig", {creationDate: new Date()});

    await fetch("api/saveinvoiceconfig", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ creationDate: new Date() }),
    });
  },
  computed: {
    creationDate: function() {
      return this.$store.getters["invoiceConfigModule/InvoiceConfig"]?.creationDate;
    }
  }

};
</script>
