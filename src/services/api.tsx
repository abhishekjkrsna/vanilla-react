import type { FetchPeopleApi, PeopleData } from "../types/types";
import { swapiBaseUrl } from "./config";
export async function fetchPeople(page: number = 1) {
  const url = `${swapiBaseUrl}/people/?page=${page}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  const data = await response.json();

  return data;
}

export async function fetchSpecies(url: string) {
  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  const data = await response.json();

  return data;
}

export async function fetchHome(url: string) {
  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  const data = await response.json();

  return data;
}

export async function searchPeopleName(name: string) {
  const url = `${swapiBaseUrl}/people/?search=${name}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  const output = await transformData(data);

  return output;
}

export async function fetchPageData(page: number) {
  const pageData = await fetchPeople(page);
  const output = await transformData(pageData);

  return output;
}

export async function transformData(pageData: FetchPeopleApi) {
  const output = await Promise.all(
    pageData.results.map(async (person: PeopleData) => {
      let species, home;

      if (person.species.length === 0) {
        species = "unknown";
      } else {
        const speciesData = await fetchSpecies(person.species[0]);
        species = speciesData.name;
      }
      if (person.homeworld === "") {
        home = {
          name: "unknown",
          terrain: "unknown",
          climate: "unknown",
          population: "unknown",
        };
      } else {
        const homeData = await fetchHome(person.homeworld);
        home = {
          name: homeData.name,
          terrain: homeData.terrain,
          climate: homeData.climate,
          population: homeData.population,
        };
      }
      const numberOfFilms = person.films.length;
      const gender = ["male", "female"].includes(person.gender)
        ? person.gender
        : "unknown";
      return {
        ...person,
        home_world: home,
        species: species,
        number_of_films: numberOfFilms,
        gender: gender,
      };
    })
  );

  return { ...pageData, results: output };
}
