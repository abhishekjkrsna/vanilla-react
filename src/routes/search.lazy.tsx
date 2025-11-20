import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { LoggedInContext } from "../context/Context";
import { useQuery } from "@tanstack/react-query";
import { searchPeopleName } from "../services/api";
import type { PeopleCardData } from "../types/types";
import PeopleCard from "../components/peoplecard/PeopleCard";

export const Route = createLazyFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const { loggedIn } = useContext(LoggedInContext);
  const [searchVal, setSearchVal] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const navigate = useNavigate({ from: "/search" });
  if (!loggedIn) {
    navigate({ to: "/login" });
  }

  const { isPending, data } = useQuery({
    queryKey: ["search", submittedSearch],
    queryFn: () => searchPeopleName(submittedSearch),
    enabled: !!submittedSearch,
  });

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedSearch(searchVal);
    setSearchVal("");
  }

  const isSearchSubmitted = submittedSearch ? (
    <div>
      <h3>Loading...</h3>
    </div>
  ) : (
    <div></div>
  );

  return (
    <div>
      <h2>Search Characters By Name</h2>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="search"
            name="name"
            id="name"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
      <div>
        {isPending ? (
          isSearchSubmitted
        ) : (
          <div>
            {data?.results.map((person: PeopleCardData) => (
              <PeopleCard
                key={person.name}
                name={person.name}
                birth_year={person.birth_year}
                height={person.height}
                mass={person.mass}
                created={person.created}
                number_of_films={person.number_of_films}
                gender={person.gender}
                species={person.species}
                homeworld={person.homeworld}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
