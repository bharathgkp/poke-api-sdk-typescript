# What is this?
This is a sdk for PokeAPI written in Typescript. Uses memory-cache to store response. 


# Design Choices
1. I decided to do a return the raw JSON form the api, because I wanted to save time from creating different classes for each resource type. Ideally, I would have create classes that would help extract information from the resource types, instead of a typescript interface. 
2. Used memory-cache to reduce the number of api requests to PokeAPI. 
3. Originally started the project in javascript but pivoted to Typescript because I thought it would be easier from a readability stand point

# Installation
The simpliest way to install this sdk would be to directly import into your project. 

You can build the module by running ```npm run build```

After successfully building the code, you can import the sdk
```javascript
import PokeAPI from "${Path to build folder}/dist/index.js";
```

# How to run tests
The tests are written using jest. All the tests are in a single file at ```./src/tests/index.test.ts``` Due to the time limitation I was only able to write simple integration tests. All the tests cover the happy path. 

With more time I would have been more thorough with unit and integration tests. 

All the tests can be run ```npm run tests```

# Documentation
## TypeDefs
### ApiResponse
|Name|Description
|-|-|
|data| PokemonResponse or GenerationResponse or NamedAPIResourceList|
|status|http status code|
|statusText| response status|
|headers| response headers

The following type defs are 1:1 mapping of PokeAPI docs
- Generation https://pokeapi.co/docs/v2#generations
- Pokemon https://pokeapi.co/docs/v2#pokemon
- NamedAPIResource https://pokeapi.co/docs/v2#namedapiresource
- NamedAPIResourceList https://pokeapi.co/docs/v2#resource-listspagination-section
## Classes
### PokeAPI
This is the class is the main interface of the SDK. 
This sdk has methods that interact with the pokemon and generation apis. 

## PokeAPI
- new PokeAPI(PokeApiConfig)
- async getPokemon(idOrName: string | number):Promise<ApiResponse<PokemonResponse>> 
- async getPokemonList(config: PaginationConfigs):Promise<ApiResponse<NamedAPIResourceList>>
- getPokemonPaginator(config?:PaginationConfigs): Paginator
- async getGeneration(idOrName: string | number):Promise<ApiResponse<GenerationResponse>> 
- async getGenerationList(config: PaginationConfigs):Promise<ApiResponse<NamedAPIResourceList>>
- getGenerationPaginator(config?:PaginationConfigs): Paginator

### new PokeAPI
#### PokeAPIConfig
| Options | Description |Default Value
|-------| ------| -- |
|baseUrl| PokeAPI url| https://pokeapi.co/api
|version| PokeAPI version | v2
|cache| cache response from PokeAPI| true

### async getPokemon(idOrName) => Promise<ApiResponse<PokemonResponse>>
| Arguments | Description | Example
|-------| ------| ---- |
|idOrName| string or number representing a pokemon id or name| *bulbasur* or *1*
### async getPokemonList(config) => Promise<ApiResponse<NamedAPIResourceList>>
| Arguments | Description | Example
|-------| ------| ---- |
|config| PaginationConfigs an object that limit and offset defined | ```{limit: 10, offset: 0}```

### async getGeneration(idOrName) => Promise<ApiResponse<GenerationResponse>>
| Arguments | Description | Example
|-------| ------| ---- |
|idOrName| string or number representing a generation id or name| *generation-i* or *1*
### async geGenerationList(config) => Promise<ApiResponse<NamedAPIResourceList>>
| Arguments | Description | Example
|-------| ------| ---- |
|config| PaginationConfigs an object that limit and offset defined | ```{limit: 10, offset: 0}```

### getPokemonPaginator(config?:PaginationConfigs) => Paginator
| Arguments | Description | Example
|-------| ------| ---- |
|idOrName| string or number representing a pokemon id or name| *bulbasur* or *1*
### getGenerationPaginator(config?:PaginationConfigs) => Paginator
| Arguments | Description | Example
|-------| ------| ---- |
|config| PaginationConfigs an object that limit and offset defined | ```{limit: 10, offset: 0}```

## Paginator
- new Paginator(resource:string, client:HttpClient, config?: PaginationConfigs)
- async get() : Promise<ApiResponse<NamedAPIResourceList>>
- async next() : Promise<ApiResponse<NamedAPIResourceList>>
- async previous() : Promise<ApiResponse<NamedAPIResourceList>>

### new Paginator(resource, client, config)
| Arguments | Description | Example
|-------| ------| ---- |
|resource| What type of PokeAPI resource you want to use| pokemon or generation
|client| Http Client wrapper around axios |
|config| PaginationConfigs an object that limit and offset defined | ```{limit: 10, offset: 0}```

### get() => Promise<ApiResponse<NamedAPIResourceList>>
Get the current page depending on what configs the Paginator was initialized with

### next() => Promise<ApiResponse<NamedAPIResourceList>>
Get the next page based on the configs

### previous() => Promise<ApiResponse<NamedAPIResourceList>>
Get the previous page based on the configs

