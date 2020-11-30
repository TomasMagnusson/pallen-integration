<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <div>
        <!--  -->
        <a href="/logout">Logga ut</a>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Pallen-integration</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ getUser() }}</span>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon large color="blue darken-2" v-bind="attrs" v-on="on"
            >mdi-account-circle</v-icon
          >
        </template>
        <span>Inloggad användare</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <!--  -->
      <div>
        <!--  -->
        <!-- <a href="/.auth/logout?post_logout_redirect_uri=http://www.google.com">Logga ut</a> -->
        <md-button class="md-primary" @click="logout()">Logga ut</md-button>
      </div>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span style="margin-left: 24px"
        >&copy; {{ new Date().getFullYear() }} TM Elektronik AB, Programversion:
        {{ getVersion() }}</span
      >
      <v-spacer></v-spacer>
      <span style="margin-right: 20px"
        >Byggd med VuetifyJS och Azure Static Webapps</span
      >
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "./store/store";

@Component({
  name: "App",
  store,
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
    this.getUserInfo().then((u) => {
      console.log(u);
    });
  }

  created() {
    store.commit("profileModule/storeClientPrincipal", {
      identityProvider: "aad",
      userId: "1eeb43bacf7b463792d72e2a4324cfb0",
      userDetails: "tomasmagnusson1234@gmail.com",
      userRoles: ["anonymous", "authenticated"],
    });
  }

  getVersion() {
    return this.$store.state.version;
  }

  getUser() {
    return this.$store.getters["profileModule/ClientPrincipal"]?.userDetails;
  }

  async logout() {
    sessionStorage.clear();
  }
}
</script>