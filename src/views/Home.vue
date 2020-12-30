<template>
  <div style="margin-top: 20px">
    <v-container fluid class="grey lighten-5 mb-6">
      <v-row no-gutters>
        <v-col cols="1">
          <v-text-field
            readonly
            label="Fakturadatum:"
            v-model="invoiceDate"
          ></v-text-field>
        </v-col>
        <v-col cols="11"></v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Fastighet</th>
                  <th class="text-left">Namn</th>
                  <th class="text-left">Adress</th>
                  <th class="text-left">Fakturerad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in customers" :key="item.CustomerNumber">
                  <td>{{ item.CustomerNumber }}</td>
                  <td>{{ item.Name }}</td>
                  <td>{{ item.Address1 }}</td>
                  <td>{{ item.Invoiced ? "Ja" : "" }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
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

  get invoiceDate() {
    return this.$store.getters[
      "invoiceConfigModule/fetchInvoiceDate"
    ].toLocaleDateString();
  }

}
</script>
