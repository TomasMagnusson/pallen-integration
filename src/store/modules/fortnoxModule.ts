// fortnoxModule.ts

import { Module, VuexModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import store from "../store";
import { Customer, Article, Invoice, FortNoxData } from '../../models/fortNoxData';

async function fetchData(): Promise<FortNoxData> {
    const response = await fetch("api/fetchcustomers");
    const cs: Customer[] = await response.json();
    return {
        customersData: cs,
        articlesData: <Article[]>[],
        invoicesData: <Invoice[]>[]
    }
}

async function fetchInvoices(invoiceDate: string): Promise<Map<string, Invoice>> {
    const response = await fetch("api/fetchinvoices/?invoiceDate=" + invoiceDate)
    const invs: Invoice[] = await response.json();
    const invsMap = new Map<string, Invoice>()

    invs.forEach(inv => invsMap.set(inv.CustomerNumber, inv))
    return invsMap
}

let loadPromise: Promise<FortNoxData> = new Promise<FortNoxData>(() => { });

export async function fortNoxPlugin(store: any) {
    loadPromise = fetchData()
    store.dispatch("fortNoxModule/loadFortNoxData");
}

@Module({ namespaced: true })
export default class FortNoxModule extends VuexModule {
    customersData: Customer[] = [];
    invoicesData: Map<string, Invoice> = new Map<string, Invoice>()

    @MutationAction
    async loadFortNoxData() {
        const fortNoxData = await loadPromise
        return { customersData: fortNoxData.customersData }
    }

    @Action
    async findInvoices(d: Date) {
        const invsMap = await fetchInvoices(d.toLocaleDateString())
        // const fortNoxData = await fetchData();

        // fortNoxData.customersData[0].Invoiced = true
        // return { customersData: fortNoxData.customersData }
        // await fetchData();
        loadPromise.then((fortNoxData) => {
            // const customersData = store.getters['fortNoxModule/fetchCustomers']
            const cdcopy = fortNoxData.customersData.concat()
            cdcopy.forEach(cust => cust.Invoiced = (invsMap.get(cust.CustomerNumber) !== undefined))
            // cdcopy[0].Invoiced = true;
            store.commit('fortNoxModule/setCustomerData', cdcopy)
        })
        // return { customersData: cdcopy }
    }

    get fetchCustomers(): Customer[] {
        return this.customersData
    }

    @Mutation
    setCustomerData(cd: Customer[]) {
        this.customersData = cd;
    }
}
