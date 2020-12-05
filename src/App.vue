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

      <v-divider></v-divider>

      <div>
        <!--  -->
        <v-btn class="md-primary" @click="logout()">Logga ut</v-btn>
      </div>
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
      <!--  -->
      <div>
        <!--  -->
        <a href="/.auth/login/aad">Logga in</a>
      </div>
      <div>
        <a
          href="/.auth/logout?post_logout_redirect_uri=https://portal.azure.com/SignOut"
          >Logga ut</a
        >
        <!-- <a href="/.auth/logout?post_logout_redirect_uri=https://github.com/logout">Logga ut</a> -->
      </div>

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
// import VueRouter from 'vue-router';
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
    { title: "Dashboard", icon: "mdi-view-dashboard", link: "" },
    { title: "Photos", icon: "mdi-image", link: "" },
    { title: "About", icon: "mdi-help-box", link: "/about" },
    { title: "Logga ut", icon: "mdi-logout", link: "/logout" },
  ];

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
    // store.commit("profileModule/storeClientPrincipal", {
    //   identityProvider: "aad",
    //   userId: "1eeb43bacf7b463792d72e2a4324cfb0",
    //   userDetails: "tomasmagnusson1234@gmail.com",
    //   userRoles: ["anonymous", "authenticated"],
    // });
    // setTimeout(() =>{
    //   store.commit("profileModule/storeClientPrincipal", {
    //     identityProvider: "aad",
    //     userId: "1eeb43bacf7b463792d72e2a4324cfb0",
    //     userDetails: "windowslive@tmelektronik.se",
    //     userRoles: ["anonymous", "authenticated"],
    //   });
    // }, 10000);
  }

  getVersion() {
    return this.$store.state.version;
  }

  get user() {
    return this.$store.getters["profileModule/ClientPrincipal"]?.userDetails;
  }

  get roles() {
    return this.$store.getters["profileModule/ClientPrincipal"]?.userRoles;
  }

  async logout() {
    sessionStorage.setItem("StaticWebAppsAuthCookie", "Smith");

    document.cookie =
      "StaticWebAppsAuthCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "has_recent_activity=1; path=/; expires=Tue, 01 Dec 2020 20:28:27 GMT; secure; HttpOnly; SameSite=Lax";
    document.cookie =
      "logged_in=no; domain=.github.com; path=/; expires=Wed, 01 Dec 2021 19:28:27 GMT; secure; HttpOnly; SameSite=Lax";
    document.cookie =
      "user_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; HttpOnly; SameSite=Lax";
    document.cookie =
      "__Host-user_session_same_site=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; HttpOnly; SameSite=Lax";
    document.cookie =
      "dotcom_user=; domain=.github.com; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; HttpOnly; SameSite=Lax";
  }
}
</script>