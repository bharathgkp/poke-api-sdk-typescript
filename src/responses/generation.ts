
import NamedAPIResource from './shared';

// Name Interface
interface Name {
  name: string;
  language: NamedAPIResource; // NamedAPIResource representing the language
}

// Generation Interface
export default interface Generation {
  id: number;
  name: string;
  abilities: NamedAPIResource[]; // List of NamedAPIResource (Ability)
  names: Name[]; // List of Name
  main_region: NamedAPIResource; // NamedAPIResource (Region)
  moves: NamedAPIResource[]; // List of NamedAPIResource (Move)
  pokemon_species: NamedAPIResource[]; // List of NamedAPIResource (PokemonSpecies)
  types: NamedAPIResource[]; // List of NamedAPIResource (Type)
  version_groups: NamedAPIResource[]; // List of NamedAPIResource (VersionGroup)
}
