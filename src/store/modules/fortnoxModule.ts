// fortnoxModule.ts

import { Module, VuexModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import store from "../store";
import { Customer, Article, Invoice, FortNoxData } from '../../models/fortNoxData';

async function fetchData(): Promise<FortNoxData> {
    let response = await fetch("api/fetchcustomers");
    let cs: Customer[] = await response.json();
    return {
        customersData: cs,
        articlesData: <Article[]>[],
        invoicesData: <Invoice[]>[]
    }
}


export async function fortNoxModule(store: any) {
    store.dispatch("fortNoxModule/loadFortNoxData");
}

@Module({ namespaced: true })
export default class FortNoxModule extends VuexModule {
    customersData: Customer[] = [];

    @MutationAction
    async loadFortNoxData() {
        const fortNoxData = await fetchData();

        return { customersData: fortNoxData.customersData }
    }

    get fetchCustomers(): Customer[] {
        return this.customersData
    }
}
