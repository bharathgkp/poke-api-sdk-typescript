'use strict';

interface PokeAPIConfig {
    baseUrl: string,
    version: string,
    cache: boolean,
}
export default class PokeApiConfig {
    baseUrl: string;
    version: string;
    cache: boolean;
    constructor(config?:PokeAPIConfig) {
        this.baseUrl = config?.baseUrl || 'https://pokeapi.co/api';
        this.version = config?.version || 'v2';
        this.cache = config?.cache || true;
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    getVersion() {
        return this.version;
    }

    shouldCache() {
        return this.cache;
    }

};

