export interface Character {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  films: string[];
}

export interface Film {
  name: string;
  description: string;
  characters: any[];
}