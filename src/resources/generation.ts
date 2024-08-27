/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';
import GenerationRes from "../responses/generation";
import NamedAPIResourceList from "../responses/shared";
import ApiResponse from "../responses/response";
import HttpClient from "../utils/http-client";
import PaginationConfigs from "./shared";
import Paginator from "./paginator";

export default class Pokemon {
    cache: any;
    client: HttpClient;
    constructor(httpClient: any) {
        this.client = httpClient;
    }

    async getGeneration(idOrName: string|number): Promise<ApiResponse<GenerationRes>> {
        const response: ApiResponse<GenerationRes> = await this.client.get<GenerationRes>(`generation/${idOrName}`, {}, true);
        return response;
    }

    async getGenerationList(configs: PaginationConfigs): Promise<ApiResponse<NamedAPIResourceList>> {
        const response: ApiResponse<NamedAPIResourceList> = await this.client.get<NamedAPIResourceList>('generation', {params: configs});
        return response;
    }

    paginator(configs?: PaginationConfigs): Paginator {
        return new Paginator('pokemon', this.client, configs);
    }
}