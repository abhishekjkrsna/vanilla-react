import { useQuery } from "@tanstack/react-query";
import { fetchHome } from "../../services/api";
import { useDebugValue } from "react";

export default function HomeWorld({ homeWorldUrl }: { homeWorldUrl: string }) {
  const noData = (
    <>
      <p>
        <strong>Home world: </strong>Unknown
      </p>
      <p>
        <strong>Climate: </strong>Unknown
      </p>
      <p>
        <strong>Terrain: </strong>Unknown
      </p>
      <p>
        <strong>Population: </strong>Unknown
      </p>
    </>
  );
  if (!homeWorldUrl) {
    return noData;
  }

  const {
    isLoading: isHomeWorldLoading,
    isError: isHomeWorldError,
    data: homeWorldData,
    isSuccess,
  } = useQuery({
    queryKey: ["homeWorld", homeWorldUrl],
    queryFn: () => fetchHome(homeWorldUrl),
    retry: 4,
    refetchInterval: 1000 * 2,
  });

  if (isHomeWorldLoading) {
    return <p>Loading...</p>;
  }

  if (isHomeWorldError) {
    return <p>Something went wrong...</p>;
  }

  if (!isSuccess || !homeWorldData) {
    return <p>Something went wrong...</p>;
  }

  return (
    <>
      <p>Home world: {homeWorldData.name}</p>
      <p>Climate: {homeWorldData.climate}</p>
      <p>Terrain: {homeWorldData.terrain}</p>
      <p>Population: {homeWorldData.population}</p>
    </>
  );
}
