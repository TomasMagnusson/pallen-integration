// profilemodule.ts

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import Vuex, { StoreOptions } from 'vuex';

export interface ClientPrincipal {
    identityProvider: string;
    userId: string;
    userDetails: string;
    userRoles: string[];
}

async function getUserInfo(): Promise<ClientPrincipal> {
    const response = await fetch("/.auth/me");
    const payload = await response.json();
    const { clientPrincipal } = payload;
    return clientPrincipal;
}

export function profilePlugin(store:any) {
    getUserInfo().then((clientPrincipal?: ClientPrincipal) => {
        console.log(clientPrincipal);
        store.commit("profileModule/storeClientPrincipal", clientPrincipal);
    })
}

@Module({ namespaced: true})
export default class ProfilenModule extends VuexModule {
    clientPrincipal?: ClientPrincipal;

    @Mutation
    storeClientPrincipal(_clientPrincipal:ClientPrincipal) {
        console.log(_clientPrincipal);
        this.clientPrincipal = _clientPrincipal;
    }

    get ClientPrincipal() {
        return this.clientPrincipal;
    }
}