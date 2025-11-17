import type { PeopleCardData } from "../../types/types";
export default function PeopleCard({ name, birth_year }: PeopleCardData) {
  return (
    <article>
      <img src="img/male/face1.png" alt="test" />
      <h3>{name}</h3>
      <p>{birth_year}</p>
    </article>
  );
}
