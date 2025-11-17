import { useNavigate, createLazyFileRoute } from "@tanstack/react-router";
import PeopleCard from "../components/peoplecard/PeopleCard";
import { useContext } from "react";
import { LoggedInContext, PageNumberContext } from "../context/Context";
import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../services/api";
import type { PeopleCardData } from "../types/types";

export const Route = createLazyFileRoute("/characters")({
  component: CharacterPage,
});

function CharacterPage() {
  const { loggedIn } = useContext(LoggedInContext);
  const { pageNum, setPageNum } = useContext(PageNumberContext);
  const navigate = useNavigate({ from: "/characters" });
  if (!loggedIn) {
    navigate({ to: "/login" });
  }

  const { isPending, data } = useQuery({
    queryKey: ["people", pageNum],
    queryFn: async () => await fetchPeople(pageNum),
    staleTime: "static",
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data.results.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div>
      {data.results.map((person: PeopleCardData) => (
        <PeopleCard
          key={person.name}
          name={person.name}
          birth_year={person.birth_year}
        />
      ))}
      <div>
        <div>
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
        <div>
          <h3>{pageNum}</h3>
        </div>
        <div>
          <button
            onClick={() => {
              setPageNum(pageNum + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={data.next ? false : true}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
