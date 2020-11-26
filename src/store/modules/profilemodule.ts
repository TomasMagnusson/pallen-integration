// profilemodule.ts

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

export interface ClientPrincipal {
    identityProvider: string;
    userId: string;
    userDetails: string;
    userRoles: string[];
}

@Module({ namespaced: true })
export default class ProfilenModule extends VuexModule {
    clientPrincipal?: ClientPrincipal;

    @Mutation
    storeClientPrincipal(_clientPrincipal:ClientPrincipal) {
        this.clientPrincipal = _clientPrincipal;
    }

    get ClientPrincipal() {
        return this.clientPrincipal;
    }
}