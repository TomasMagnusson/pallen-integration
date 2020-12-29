<template>
  <div style="margin-top: 20px">
    <v-container fluid class="grey lighten-5 mb-6">
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Fastighet</th>
              <th class="text-left">Namn</th>
              <th class="text-left">Adress</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in customers" :key="item.CustomerNumber">
              <td>{{ item.CustomerNumber }}</td>
              <td>{{ item.Name }}</td>
              <td>{{ item.Address1 }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Component } from "vue-property-decorator";

import { Customer } from "../models/fortNoxData";
// import { Vue, Component } from "vue-property-decorator";
import store from "../store/store";

@Component({
  name: "Home",
  store,
})
export default class Home extends Vue {
  get customers() {
    let v: Customer[] = this.$store.getters["fortNoxModule/fetchCustomers"];
    return v;
  }
}
</script>
