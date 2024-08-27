import PokeAPI from "../index";

test('Get Pokemon id 1', async () => {
    const api = new PokeAPI();
    const pokemon = await api.getPokemon(1);
    expect(pokemon.data.name).toBe("bulbasaur");
})

test('Get Pokemon by name', async () => {
    const api = new PokeAPI();
    const pokemon = await api.getPokemon("bulbasaur");
    expect(pokemon.data.id).toBe(1);
})

test('Get Pokemon with Pagination', async () => {
    const api = new PokeAPI();
    const pokemons = await api.getPokemonList({limit: 2, offset: 0});
    expect(pokemons.data.results).toMatchObject([
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur',  url: 'https://pokeapi.co/api/v2/pokemon/2/'}
    ]);
})

test('Get Generation by id', async () => {
    const api = new PokeAPI();
    const generation = await api.getGeneration(1);
    expect(generation.data.name).toBe("generation-i");
})

test('Get Generation by name', async () => {
    const api = new PokeAPI();
    const generation = await api.getGeneration("generation-i");
    expect(generation.data.id).toBe(1);
})

test('Get Generation with Pagination', async () => {
    const api = new PokeAPI();
    const generation = await api.getGenerationList({limit: 2, offset: 0});
    expect(generation.data.results).toMatchObject([
         { name: "generation-i", url: "https://pokeapi.co/api/v2/generation/1/" },
         { name: "generation-ii",url: "https://pokeapi.co/api/v2/generation/2/" },
      ]);
})