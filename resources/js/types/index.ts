export interface Character {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  films: string[];
  uid: string;
}

export interface Film {
  name: string;
  opening_crawl: string;
  characters: string[];
  uid: string;
}

export interface SearchResponse {
  name: string;
  uid: string;
}