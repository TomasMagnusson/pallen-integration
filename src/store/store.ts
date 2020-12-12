import Vue from "vue";
import Vuex, { StoreOptions } from 'vuex';
import ProfileModule, {profilePlugin} from './modules/profilemodule';
import InvoiceConfigModule from "./modules/invoiceConfigModule"

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
        invoiceConfigModule: InvoiceConfigModule
    },
    plugins: [profilePlugin]
}

export default new Vuex.Store<RootState>(store);