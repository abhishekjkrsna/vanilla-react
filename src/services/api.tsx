import { swapiBaseUrl } from "./config";

export async function fetchPeople(page: number = 1) {
  const url = `${swapiBaseUrl}/people/?page=${page}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export async function fetchSpecies(url: string) {
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export async function fetchHome(url: string) {
  const response = await fetch(url, {
    method: "GET",
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

  return data;
}
