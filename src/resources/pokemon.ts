/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import PokemonRes from "../responses/pokemon";
import NamedAPIResourceList from "../responses/shared";
import ApiResponse from "../responses/response";
import HttpClient from "../utils/http-client";
import PaginationConfigs from "./shared";
import Paginator from "./paginator";

export default class Pokemon {
    client: HttpClient;
    constructor(httpClient: any) {
        this.client = httpClient;
    }

    async getPokemon(idOrName: string|number): Promise<ApiResponse<PokemonRes>> {
        const response: ApiResponse<PokemonRes> = await this.client.get<PokemonRes>(`pokemon/${idOrName}`, {}, true);
        return response;
    }

    async getPokemonList(configs: PaginationConfigs): Promise<ApiResponse<NamedAPIResourceList>> {
        const response: ApiResponse<NamedAPIResourceList> = await this.client.get<NamedAPIResourceList>('pokemon', {params: configs});
        return response;
    }

    paginator(configs?: PaginationConfigs): Paginator {
        return new Paginator('pokemon', this.client, configs);
    }
}