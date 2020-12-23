<template>
  <div style="margin-top: 20px;">
    <v-container
      fluid
      id="input-usage"
      class="grey lighten-5 mb-6"
    >
      <v-row no-gutters style="height: 150px">
        <v-col cols="1">
          <v-text-field label="Fakturadatum" v-model="invoiceDate" @change="updateInvoiceDate"></v-text-field>
        </v-col>
        <v-col cols="9"></v-col>
        <v-col cols="2">
          <v-text-field label="Tidstämpel" v-model="creationDate" readonly filled
            :error-messages="errorMessage"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "../store/store";

@Component({
  name: "InvoiceSettings",
  store,
})
export default class InvoiceSettings extends Vue {

  get creationDate() {
      return this.$store.getters['invoiceConfigModule/fetchCreationDate'].toLocaleString();
  }

  get errorMessage() {
      return this.$store.getters['invoiceConfigModule/fetchErrorMessage'];
  }

  updateInvoiceDate(val: string) {
      this.$store.commit('invoiceConfigModule/setInvoiceDate', new Date(val));
  }

  get invoiceDate() {
      return this.$store.getters['invoiceConfigModule/fetchInvoiceDate'].toLocaleDateString();
  }

}
</script>

<style scoped>
  
</style>
