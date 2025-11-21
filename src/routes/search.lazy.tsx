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
  const navigate = useNavigate({ from: "/search" });
  if (!loggedIn) {
    navigate({ to: "/login" });
  }
  const [searchVal, setSearchVal] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["search", submittedTerm],
    queryFn: () => searchPeopleName(submittedTerm),
    enabled: !!submittedTerm,
  });

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchVal.trim()) return;
    setSubmittedTerm(searchVal.trim());
  }

  const renderSearchResults = () => {
    if (isPending && submittedTerm) {
      return (
        <div>
          <progress />
        </div>
      );
    }

    if (isError) {
      return (
        <div>
          <h3>Error: {error?.message}</h3>
        </div>
      );
    }

    if (!data) {
      return null;
    }

    if (data.results.length === 0) {
      return <p>No results found</p>;
    }

    return data.results.map((person: PeopleCardData) => (
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
    ));
  };

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
      <div>{renderSearchResults()}</div>
    </div>
  );
}
