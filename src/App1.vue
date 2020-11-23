<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
      <div> <h1>{{data}} <v-icon
      large
      color="orange darken-2"
    >
      two_wheeler
    </v-icon></h1></div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { Component } from "vue-property-decorator";

@Component({
  name: "App",
  components: {
    HelloWorld,
  }
})
export default class App extends Vue {
  public data: string = "xyz";


  public async Execute():Promise<string> {
      const res = await fetch(`/api/message`);
      const {text} = await res.json();
      console.log(text);
      return text;
  }

  mounted() {

    console.log("onload: ");
  

    this.Execute().then(data => {this.data = data;});

    
  }
}

</script>
