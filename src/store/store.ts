import Vue from "vue";
import Vuex, { StoreOptions } from 'vuex';
import ProfileModule, {profilePlugin} from './modules/profilemodule';

Vue.use(Vuex);

export interface RootState {
    version: string
}

const store: StoreOptions<RootState> = {
    state: {
        version: "0.1.0"
    },
    modules: {
        profileModule: ProfileModule
    },
    plugins: [profilePlugin]
}

export default new Vuex.Store<RootState>(store);