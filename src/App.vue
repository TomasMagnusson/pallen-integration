<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <a href="/.auth/logout?post_logout_redirect_uri=http://www.google.com">Logga ut</a>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Pallen-integration</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>

    <v-footer :fixed="fixed" app>
      <span style="margin-left: 24px"
        >&copy; {{ new Date().getFullYear() }} TM Elektronik AB</span
      >
      <v-spacer></v-spacer>
      <span style="margin-right: 20px">Byggd med VuetifyJS och Azure Static Webapps</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "App",
})
export default class App extends Vue {
  drawer = false;

  public async getUserInfo(): Promise<any> {
    const response = await fetch("/.auth/me");
    const payload = await response.json();
    const { clientPrincipal } = payload;
    return clientPrincipal;
  }

  mounted() {
    this.getUserInfo().then(u => {console.log(u);})

  }
}

</script>