import type { PeopleCardData } from "../../types/types";
import { useRef } from "react";

export default function PeopleCard({
  name,
  height,
  mass,
  created,
  number_of_films,
  birth_year,
  gender,
  species,
  home_world,
}: PeopleCardData) {
  const photoUrl = `img/${gender}/face1.png`;

  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  return (
    <article key={name}>
      <img src={photoUrl} alt={name} />
      <h3>{name}</h3>
      <button onClick={openModal}>Info</button>
      <div>
        <dialog ref={dialogRef}>
          <h3>{name}</h3>
          <p>Height: {height}</p>
          <p>Mass: {mass}</p>
          <p>Created: {created}</p>
          <p>Number of films: {number_of_films}</p>
          <p>Birth year: {birth_year}</p>
          <p>Gender: {gender}</p>
          <p>Species: {species}</p>
          <p>Home world: {home_world.name}</p>
          <p>Climate: {home_world.climate}</p>
          <p>Terrain: {home_world.terrain}</p>
          <p>Population: {home_world.population}</p>
          <button id="cancel" type="reset" onClick={closeModal}>
            Cancel
          </button>
        </dialog>
      </div>
    </article>
  );
}
