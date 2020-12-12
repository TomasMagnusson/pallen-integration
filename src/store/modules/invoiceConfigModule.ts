// invoiceConfigModule.ts

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import Vuex, { StoreOptions } from 'vuex';
import { InvoiceConfig } from "../../models/InvoiceModels";

async function postData(_data: InvoiceConfig) {
    const response = await fetch("api/saveinvoiceconfig", {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(_data)
    });
}

@Module({ namespaced: true })
export default class InvoiceConfigModule extends VuexModule {
    invoiceConfig: InvoiceConfig = { creationDate: new Date("2020-12-11") };

    @Mutation
    async storeInvoiceConfig(_invoiceConfig: InvoiceConfig) {
        this.invoiceConfig = _invoiceConfig;
        console.log(_invoiceConfig);
        await postData(_invoiceConfig);
    }

}