<template>
  <div style="margin-top: 20px">
    <v-container fluid id="input-usage" class="grey lighten-5 mb-6">
      <v-row no-gutters style="height: 150px">
        <v-col cols="1">
          <v-text-field
            label="Fakturadatum:"
            v-model="invoiceDate"
            @change="updateInvoiceDate"
          ></v-text-field>
        </v-col>
        <v-col cols="9"></v-col>
        <v-col cols="2">
          <v-text-field
            label="Tidstämpel:"
            v-model="creationDate"
            readonly
            filled
            :error-messages="errorMessage"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        :headers="customerTypeHeaders"
        :items="CustomerTypeData"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Fastighetstyper</v-toolbar-title>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteCustomerType(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { CustomerTypeConfig } from "@/models/configData";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "../store/store";

@Component({
  name: "InvoiceSettings",
  store,
})
export default class InvoiceSettings extends Vue {
  get creationDate() {
    return this.$store.getters[
      "invoiceConfigModule/fetchCreationDate"
    ].toLocaleString();
  }

  get errorMessage() {
    return this.$store.getters["invoiceConfigModule/fetchErrorMessage"];
  }

  updateInvoiceDate(val: string) {
    this.$store.commit("invoiceConfigModule/setInvoiceDate", new Date(val));
  }

  get invoiceDate() {
    return this.$store.getters[
      "invoiceConfigModule/fetchInvoiceDate"
    ].toLocaleDateString();
  }

  customerTypeHeaders = [
    {
      text: "Fastighetstyp",
      align: "start",
      sortable: false,
      value: "customerType",
    },
    { text: "Anläggningar", value: "articleNumbers", sortable: false },
    { text: "Ta bort", value: "actions", sortable: false },
  ];

  get CustomerTypeData() {
    return this.$store.getters["invoiceConfigModule/fetchCustomerTypes"];
  }

  deleteCustomerType(ct: CustomerTypeConfig) {
    this.$store.dispatch('invoiceConfigModule/deleteCustomerType', ct);
  }
}
</script>

<style scoped>
</style>
