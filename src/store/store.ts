import Vue from "vue";
import Vuex, { StoreOptions } from 'vuex';
import ProfileModule, { profilePlugin } from './modules/profilemodule';
import InvoiceConfigModule, { invoiceConfigPlugin } from "./modules/invoiceConfigModule"
import FortNoxModule, { fortNoxPlugin } from './modules/fortnoxModule'

Vue.use(Vuex);

export interface RootState {
    version: string
}

const store: StoreOptions<RootState> = {
    state: {
        version: "0.2.0"
    },
    modules: {
        profileModule: ProfileModule,
        invoiceConfigModule: InvoiceConfigModule,
        fortNoxModule: FortNoxModule
    },
    plugins: [profilePlugin, invoiceConfigPlugin, fortNoxPlugin]
}

export default new Vuex.Store<RootState>(store);