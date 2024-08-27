import NamedAPIResource from './shared';

// PokemonAbility Interface
interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource; // Ability resource
}

// PokemonType Interface
interface PokemonType {
  slot: number;
  type: NamedAPIResource; // Type resource
}

// PokemonTypePast Interface
interface PokemonTypePast {
  generation: NamedAPIResource; // Generation resource
  types: PokemonType[];
}

// PokemonHeldItemVersion Interface
interface PokemonHeldItemVersion {
  version: NamedAPIResource; // Version resource
  rarity: number;
}

// PokemonHeldItem Interface
interface PokemonHeldItem {
  item: NamedAPIResource; // Item resource
  version_details: PokemonHeldItemVersion[];
}

// PokemonMoveVersion Interface
interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource; // MoveLearnMethod resource
  version_group: NamedAPIResource; // VersionGroup resource
  level_learned_at: number;
}

// PokemonMove Interface
interface PokemonMove {
  move: NamedAPIResource; // Move resource
  version_group_details: PokemonMoveVersion[];
}

// PokemonStat Interface
interface PokemonStat {
  stat: NamedAPIResource; // Stat resource
  effort: number;
  base_stat: number;
}

// PokemonSprites Interface
interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default: string;
  back_shiny: string;
  back_female?: string;
  back_shiny_female?: string;
}

// PokemonCries Interface
interface PokemonCries {
  latest: string;
  legacy?: string;
}

// VersionGameIndex Interface
interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource; // Version resource
}

// Pokemon Interface
export default interface PokemonResponse {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[]; // PokemonForm resources
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string; // URL
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: NamedAPIResource; // PokemonSpecies resource
  stats: PokemonStat[];
  types: PokemonType[];
}
