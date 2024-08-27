import ApiResponse from "../responses/response";
import PaginationConfigs from "./shared";
import NamedAPIResourceList from "../responses/shared";
import HttpClient from "../utils/http-client";
import { URL } from "url";

export default class Paginator {
    private current:PaginationConfigs;
    private nextPage?: PaginationConfigs | null;
    private prevPage?: PaginationConfigs | null;
    private resource: string;
    private client: HttpClient;

    constructor(resource:string, client:HttpClient, config?: PaginationConfigs) {
        const offset = config?.offset || 0;
        const limit = config?.limit || 10;
        this.current = {limit, offset};
        this.resource = resource;
        this.client = client;
    }


    private getPaginationConfigs(url: string) : PaginationConfigs | null {
        if(url === null) {
            return null;
        }
        const urlObj = new URL(url)
        const limit = urlObj.searchParams.get('limit');
        const offset = urlObj.searchParams.get('offset');
        return {limit: Number(limit), offset: Number(offset)}
    }
    async get() : Promise<ApiResponse<NamedAPIResourceList>>{
        const response: ApiResponse<NamedAPIResourceList> = await this.client.get<NamedAPIResourceList>(this.resource, {params: this.current});
        this.nextPage = this.getPaginationConfigs(response.data.next);
        this.prevPage = this.getPaginationConfigs(response.data.previous);
        return response;
    }

    async next() : Promise<ApiResponse<NamedAPIResourceList>>{
        if(this.nextPage) {
            const response: ApiResponse<NamedAPIResourceList> = await this.client.get<NamedAPIResourceList>(this.resource, {params: this.nextPage});
            this.current = {limit: this.nextPage.limit, offset: this.nextPage.limit};
            this.nextPage = this.getPaginationConfigs(response.data.next);
            this.prevPage = this.getPaginationConfigs(response.data.previous);
            return response;
        }
        return this.get()
    }

    async previous(): Promise<ApiResponse<NamedAPIResourceList>>{
        if(this.prevPage) {
            const response: ApiResponse<NamedAPIResourceList> = await this.client.get<NamedAPIResourceList>(this.resource, {params: this.prevPage});
            this.current = {limit: this.prevPage.limit, offset: this.prevPage.limit};
            this.nextPage = this.getPaginationConfigs(response.data.next);
            this.prevPage = this.getPaginationConfigs(response.data.previous);
            return response;
        }
        return this.get()
    }






}