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
            label="Sparad:"
            v-model="creationDate"
            readonly
            filled
            :error-messages="errorMessage"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Fastighetstyper -->
      <v-data-table
        :headers="customerTypeHeaders"
        :items="CustomerTypeData"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Fastighetstyper</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon
              large
              @click="
                CustomerTypeData.push({
                  customerType: '- Klicka! -',
                  articleNumbers: [],
                })
              "
              >mdi-plus-circle</v-icon
            >
          </v-toolbar>
        </template>

        <template v-slot:item.customerType="{ item }">
          <v-edit-dialog @close="saveCustomerType(item)">
            {{ item.customerType }}
            <template v-slot:input>
              <v-text-field v-model="item.customerType"> </v-text-field>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.articleNumbers="{ item }">
          <v-edit-dialog @close="saveCustomerType(item)">
            {{ arts2decriptions(item.articleNumbers) }}
            <template v-slot:input>
              <v-checkbox
                v-for="artkey in articleMap.keys()"
                v-bind:key="artkey"
                :label="articleMap.get(artkey).Description"
                :value="artkey"
                v-model="item.articleNumbers"
              ></v-checkbox>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteCustomerType(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>

      <!-- Extrarader -->
      <v-data-table
        style="margin-top: 20px"
        :headers="customerExtraHeaders"
        :items="CustomerExtraData"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Extra fakturarader</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon
              large
              @click="
                CustomerExtraData.push({
                  description: '- Klicka! -',
                  price: '- Klicka! -',
                })
              "
              >mdi-plus-circle</v-icon
            >
          </v-toolbar>
        </template>

        <template v-slot:item.description="{ item }">
          <v-edit-dialog @close="saveCustomerExtra(item)" 
          :return-value.sync="item.description"
          >
            {{ item.description }}
            <template v-slot:input>
              <v-text-field v-model="item.description"> </v-text-field>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.price="{ item }">
          <v-edit-dialog
            @close="saveCustomerExtra(item)"
            :return-value.sync="item.price"
          >
            {{ item.price }}
            <template v-slot:input>
              <v-text-field
                v-model.number="item.price"
                type="number"
                :rules="[
                  (x) => /^\-?[1-9]\d{0,3}$/.test(x) || 'Anges som kronor, max 4 siffror',
                ]"
              >
              </v-text-field>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteCustomerExtra(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { CustomerTypeConfig, CustomerExtraConfig } from "@/models/configData";
import { Article } from "@/models/fortNoxData";

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

  /* Customer types */

  get articleMap(): Map<string, Article> {
    return this.$store.getters["fortNoxModule/fetchArticles"];
  }

  arts2decriptions(artlist: string[]): string {
    let retval = "";

    artlist.forEach((art) => {
      retval +=
        (retval.length > 0 ? ", " : "") + this.articleMap.get(art)?.Description;
    });

    return retval.length > 0 ? retval : "- Klicka! -";
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
    this.$store.dispatch("invoiceConfigModule/deleteCustomerType", ct);
  }

  saveCustomerType(ct: CustomerTypeConfig) {
    this.$store.commit("invoiceConfigModule/updateCustomerType", ct);
  }

  /* Extra rows */

  get CustomerExtraData() {
    return this.$store.getters["invoiceConfigModule/fetchCustomerExtras"];
  }

  customerExtraHeaders = [
    {
      text: "Beskrivning",
      align: "start",
      sortable: false,
      value: "description",
    },
    { text: "Belopp", value: "price", sortable: false },
    { text: "Ta bort", value: "actions", sortable: false },
  ];

  saveCustomerExtra(ce: CustomerExtraConfig) {
    this.$store.commit("invoiceConfigModule/updateCustomerExtra", ce);
  }

  deleteCustomerExtra(ce: CustomerExtraConfig) {
    this.$store.dispatch("invoiceConfigModule/deleteCustomerExtra", ce);
  }
}
</script>

<style scoped>
</style>
