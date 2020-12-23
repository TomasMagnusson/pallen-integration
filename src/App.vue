<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Pallen-integration
          </v-list-item-title>
          <v-list-item-subtitle> Verktyg </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          dense
          router
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Pallen-integration</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ user }}</span>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon large color="blue darken-2" v-bind="attrs" v-on="on"
            >mdi-account-circle</v-icon
          >
        </template>
        <span>Inloggad användare<br />{{ roles }}</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
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
  items = [
    { title: "Hem", icon: "mdi-home", link: "/" },
    { title: "Fakturainställning", icon: "mdi-table-settings", link: "/invoice-settings"},
    { title: "Dashboard", icon: "mdi-view-dashboard", link: "/dashboard" },
    { title: "Photos", icon: "mdi-image", link: "/photos" },
    { title: "Om", icon: "mdi-help-box", link: "/about" },
    { title: "Logga ut", icon: "mdi-logout", link: "/logout" },
  ];

  getVersion() {
    return this.$store.state.version;
  }

  get user() {
    return this.$store.getters["profileModule/ClientPrincipal"]?.userDetails;
  }

  get roles() {
    return this.$store.getters["profileModule/ClientPrincipal"]?.userRoles;
  }
}
</script>