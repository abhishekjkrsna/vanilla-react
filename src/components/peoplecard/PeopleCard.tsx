import type { PeopleCardData } from "../../types/types";
import { lazy, Suspense, useRef, useState } from "react";

const HomeWorld = lazy(() => import("./HomeWorld"));

export default function PeopleCard({
  name,
  height,
  mass,
  created,
  number_of_films,
  birth_year,
  gender,
  species,
  homeworld,
}: Readonly<PeopleCardData>) {
  const photoUrl = `img/${gender}/face1.png`;
  const [showHome, setShowHome] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    dialogRef.current?.showModal();
    setShowHome(true);
  }

  function closeModal() {
    dialogRef.current?.close();
    setShowHome(false);
  }

  return (
    <article key={name}>
      <header className="grid">
        <img
          src={photoUrl}
          alt={name}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </header>

      <h3>{name}</h3>
      <footer className="grid">
        <button onClick={openModal}>Info</button>
      </footer>
      <div>
        <dialog ref={dialogRef}>
          <article>
            <h3>{name}</h3>
            <p>Height: {height}</p>
            <p>Mass: {mass}</p>
            <p>Created: {created}</p>
            <p>Number of films: {number_of_films}</p>
            <p>Birth year: {birth_year}</p>
            <p>Gender: {gender}</p>
            <p>Species: {species}</p>
            {showHome && homeworld ? (
              <Suspense fallback={<div>Loading the data...</div>}>
                <HomeWorld homeWorldUrl={homeworld} />
              </Suspense>
            ) : (
              <></>
            )}
            <div className="grid">
              <button
                id="cancel"
                type="reset"
                onClick={closeModal}
                className="primary"
              >
                Cancel
              </button>
            </div>
          </article>
        </dialog>
      </div>
    </article>
  );
}
