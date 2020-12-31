// invoiceConfigModule.ts

import { Module, VuexModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import Vuex, { StoreOptions } from 'vuex';
// import { InvoiceConfig } from "../../../api/models/InvoiceModels";
import store from "../store";

export interface InvoiceConfig {
    creationDate: Date,
    invoiceDate: Date
}

async function postData(_data: InvoiceConfig) {
    const response = await fetch("api/saveinvoiceconfig", {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(_data)
    });
    return response;
}

async function fetchData(): Promise<InvoiceConfig> {
    const response = await fetch("api/fetchinvoiceconfig");
    const j = await response.json();
    return {
        creationDate: new Date(j.creationDate),
        invoiceDate: new Date(j.invoiceDate)
    }
}

let peristHandle = 0;

function schedulePersist() {
    clearTimeout(peristHandle);
    peristHandle = setTimeout(() => {
        store.commit('invoiceConfigModule/stampVersion');
        postData(store.getters['invoiceConfigModule/invoiceConfig']).then((resp) => {
            store.commit('invoiceConfigModule/setErrorMessage', resp.ok ? "" : "Kunde inte lagra fakturakonfigurationen!");
        })
    }, 5000);
}


export async function invoiceConfigPlugin(store: any) {
    store.dispatch("invoiceConfigModule/loadInvoiceConfig");
}

@Module({ namespaced: true })
export default class InvoiceConfigModule extends VuexModule {
    // invoiceConfig: InvoiceConfig = { creationDate: new Date("2020-12-11") };
    creationDate: Date = new Date("1900-01-01T09:51:42.460Z");
    invoiceDate: Date = new Date('2020-01-01');
    errorMessage = "";

    @MutationAction
    async loadInvoiceConfig() {
        const invoiceConfig: InvoiceConfig = await fetchData();
        store.dispatch('fortNoxModule/findInvoices', invoiceConfig.invoiceDate)
        return { creationDate: invoiceConfig.creationDate, invoiceDate: invoiceConfig.invoiceDate };
    }

    // @Mutation
    // async storeInvoiceConfig(_invoiceConfig: InvoiceConfig) {
    //     this.invoiceConfig = _invoiceConfig;
    //     console.log(_invoiceConfig);
    //     await postData(_invoiceConfig);
    // }

    @Mutation
    setInvoiceDate(d: Date) {
        this.invoiceDate = d;
        schedulePersist();
    }

    get fetchInvoiceDate() {
        return this.invoiceDate;
    }


    get invoiceConfig(): InvoiceConfig {
        return { creationDate: this.creationDate, invoiceDate: this.invoiceDate };
    }

    @Mutation
    stampVersion() {
        this.creationDate = new Date();
    }

    get fetchCreationDate(): Date {
        return this.creationDate;
    }

    @Mutation setErrorMessage(emsg:string) {
        this.errorMessage = emsg;
    }

    get fetchErrorMessage() {
        return this.errorMessage;
    }
}