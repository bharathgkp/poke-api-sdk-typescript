/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict' 

import PokeApiConfig from './utils/poke-api-config';
import PaginationConfigs from './resources/shared';
import * as memCache from 'memory-cache';
import { CacheClass } from 'memory-cache';
import Pokemon from './resources/pokemon';
import Generation from './resources/generation';
import HttpClient from './utils/http-client';
import ApiResponse from './responses/response';
import PokemonResponse from './responses/pokemon';
import GenerationResponse from './responses/generation';
import NamedAPIResourceList from './responses/shared';
import Paginator from './resources/paginator';

export default class PokeAPI {
    config: PokeApiConfig;
    cache: CacheClass<string,any>;
    pokemon: Pokemon;
    client:HttpClient;
    generation: Generation;
    constructor(config?: PokeApiConfig){
        this.config = new PokeApiConfig(config)
        this.cache = new memCache.Cache();
        this.client = new HttpClient(this.config.getBaseUrl(), this.config.getVersion(),this.cache)
        this.pokemon = new Pokemon(this.client);
        this.generation = new Generation(this.client);
    }

    async getPokemon(idOrName: string | number):Promise<ApiResponse<PokemonResponse>>{
        return await this.pokemon.getPokemon(idOrName);
    }

    async getPokemonList(config: PaginationConfigs):Promise<ApiResponse<NamedAPIResourceList>>{
        return await this.pokemon.getPokemonList(config);
    }

    getPokemonPaginator(config?:PaginationConfigs): Paginator {
        return this.pokemon.paginator(config)
    }

    async getGeneration(idOrName: string | number): Promise<ApiResponse<GenerationResponse>> {
        return await this.generation.getGeneration(idOrName);
    }

    async getGenerationList(config: PaginationConfigs):Promise<ApiResponse<NamedAPIResourceList>>{
        return await this.generation.getGenerationList(config);
    }

    getGenerationPaginator(config?:PaginationConfigs): Paginator {
        return this.generation.paginator(config)
    }

}