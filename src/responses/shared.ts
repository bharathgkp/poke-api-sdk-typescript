// NamedAPIResource Interface
export default interface NamedAPIResource {
  name: string;
  url: string;
}

export default interface NamedAPIResourceList {
  count: number;
  next: string;
  previous: string;
  results: Array<NamedAPIResource>
}