import {
  FetchPeopleApi,
  PeopleCardData,
  PeopleData,
} from "../../src/types/types";

export const mockUrl = "https://swapi.dev/api/people/1/";

export const mockPeopleData = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/6/",
  ],
  species: ["https://swapi.dev/api/species/1/"],
  vehicles: [
    "https://swapi.dev/api/vehicles/14/",
    "https://swapi.dev/api/vehicles/30/",
  ],
  starships: [
    "https://swapi.dev/api/starships/12/",
    "https://swapi.dev/api/starships/22/",
  ],
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  url: "https://swapi.dev/api/people/1/",
};

export const mockPlanetData = {
  name: "Tatooine",
  rotation_period: "23",
  orbital_period: "304",
  diameter: "10465",
  climate: "arid",
  gravity: "1 standard",
  terrain: "desert",
  surface_water: "1",
  population: "200000",
  residents: [
    "https://swapi.dev/api/people/1/",
    "https://swapi.dev/api/people/2/",
    "https://swapi.dev/api/people/4/",
    "https://swapi.dev/api/people/6/",
    "https://swapi.dev/api/people/7/",
    "https://swapi.dev/api/people/8/",
    "https://swapi.dev/api/people/9/",
    "https://swapi.dev/api/people/11/",
    "https://swapi.dev/api/people/43/",
    "https://swapi.dev/api/people/62/",
  ],
  films: [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/4/",
    "https://swapi.dev/api/films/5/",
    "https://swapi.dev/api/films/6/",
  ],
  created: "2014-12-09T13:50:49.641000Z",
  edited: "2014-12-20T20:58:18.411000Z",
  url: "https://swapi.dev/api/planets/1/",
};

export const mockSpeciesData = {
  name: "Human",
  classification: "mammal",
  designation: "sentient",
  average_height: "180",
  skin_colors: "caucasian, black, asian, hispanic",
  hair_colors: "blonde, brown, black, red",
  eye_colors: "brown, blue, green, hazel, grey, amber",
  average_lifespan: "120",
  homeworld: "https://swapi.dev/api/planets/9/",
  language: "Galactic Basic",
  people: [
    "https://swapi.dev/api/people/66/",
    "https://swapi.dev/api/people/67/",
    "https://swapi.dev/api/people/68/",
    "https://swapi.dev/api/people/74/",
  ],
  films: [
    "https://swapi.dev/api/films/1/",
    "https://swapi.dev/api/films/2/",
    "https://swapi.dev/api/films/3/",
    "https://swapi.dev/api/films/4/",
    "https://swapi.dev/api/films/5/",
    "https://swapi.dev/api/films/6/",
  ],
  created: "2014-12-10T13:52:11.567000Z",
  edited: "2014-12-20T21:36:42.136000Z",
  url: "https://swapi.dev/api/species/1/",
};

export const mockPeopleApiResult = {
  count: 1,
  next: "",
  previous: "",
  results: [mockPeopleData],
};

export const mockTransformedPeopleData: PeopleCardData = {
  ...mockPeopleData,
  species: mockSpeciesData.name,
  number_of_films: mockPeopleData.films.length,
  gender: mockPeopleData.gender,
};

export const mockFemalePeopleData: PeopleData = {
  ...mockPeopleData,
  name: "Leia Organa",
  gender: "female",
  species: [], // No species for testing "unknown"
};

export const mockFemalePeopleApiResult: FetchPeopleApi = {
  count: 1,
  next: "",
  previous: "",
  results: [mockFemalePeopleData],
};

export const mockTransformedFemalePeopleData = {
  ...mockFemalePeopleData,
  species: "unknown",
  number_of_films: mockFemalePeopleData.films.length,
  gender: mockFemalePeopleData.gender,
};
