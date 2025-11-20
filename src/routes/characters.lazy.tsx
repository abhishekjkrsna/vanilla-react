import { useNavigate, createLazyFileRoute } from "@tanstack/react-router";
import PeopleCard from "../components/peoplecard/PeopleCard";
import { useContext, useEffect } from "react";
import { LoggedInContext, PageNumberContext } from "../context/Context";
import { useQuery } from "@tanstack/react-query";
import { fetchPageData } from "../services/api";
import type { PeopleCardData, PeopleApi } from "../types/types";

export const Route = createLazyFileRoute("/characters")({
  component: CharacterPage,
});

function CharacterPage() {
  const { loggedIn } = useContext(LoggedInContext);
  const { pageNum, setPageNum } = useContext(PageNumberContext);
  const navigate = useNavigate({ from: "/characters" });
  useEffect(() => {
    if (!loggedIn) {
      navigate({ to: "/login" });
    }
  }, [loggedIn, navigate]);

  const { isLoading, data } = useQuery<PeopleApi>({
    queryKey: ["page", pageNum],
    queryFn: async () => await fetchPageData(pageNum),
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !data) {
    return <div>No results found</div>;
  }

  // Split results into groups of 3 for row rendering
  const groups: PeopleCardData[][] = [];
  for (let i = 0; i < data!.results.length; i += 3) {
    groups.push(data!.results.slice(i, i + 3));
  }

  return (
    <div className="container">
      <div>
        {groups.map((group, groupIdx) => (
          <div className="grid" key={`group-${groupIdx}`}>
            {group.map((person: PeopleCardData) => (
              <PeopleCard
                key={`${person.name}-${groupIdx}`}
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
        ))}
      </div>
      <div className="grid container-fluid">
        <div className="grid">
          <button
            disabled={pageNum === 1}
            onClick={() => {
              setPageNum(pageNum - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Previous
          </button>
        </div>
        <div className="grid" style={{ textAlign: "center" }}>
          <h3>{pageNum}</h3>
        </div>
        <div className="grid">
          <button
            onClick={() => {
              setPageNum(pageNum + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={data!.next ? false : true}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
