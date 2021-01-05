// fortnoxModule.ts

import { Module, VuexModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import store from "../store";
import { Customer, Article, Invoice, FortNoxData } from '../../models/fortNoxData';

async function fetchData(): Promise<FortNoxData> {
    const response = await fetch("api/fetchcustomers")
    const resp2 = await fetch('/api/fetcharticles')

    const cs: Customer[] = await response.json()
    const arts: Article[] = await resp2.json()

    const artsMap = new Map<string, Article>()
    arts.forEach( art => artsMap.set(art.ArticleNumer, art))

    return {
        customersData: cs,
        articlesData: artsMap,
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
    customersData: Customer[] = []
    invoicesData: Map<string, Invoice> = new Map<string, Invoice>()
    articlesData: Map<string, Article> = new Map<string, Article>()

    @MutationAction
    async loadFortNoxData() {
        const fortNoxData = await loadPromise
        return { customersData: fortNoxData.customersData, articlesData:  fortNoxData.articlesData}
    }

    @Action
    async findInvoices(d: Date) {
        const invsMap = await fetchInvoices(d.toLocaleDateString())

        store.commit('fortNoxModule/setInvoiceData', invsMap)
        loadPromise.then((fortNoxData) => {
            const cdcopy = fortNoxData.customersData.concat()
            cdcopy.forEach(cust => cust.Invoiced = (invsMap.get(cust.CustomerNumber) !== undefined))
            store.commit('fortNoxModule/setCustomerData', cdcopy)
        })
    }

    get fetchCustomers(): Customer[] {
        return this.customersData
    }

    @Mutation
    setCustomerData(cd: Customer[]) {
        this.customersData = cd;
    }

    @Mutation
    setInvoiceData(invsMap: Map<string, Invoice>) {
        this.invoicesData = invsMap
    }

    @Mutation
    setInvoice(inv: Invoice) {
        this.invoicesData.set(inv.CustomerNumber, inv)
    }
}
