import { useQuery } from "@tanstack/react-query";
import { fetchUrl } from "../../services/api";

export default function HomeWorld({
  homeWorldUrl,
}: Readonly<{ homeWorldUrl: string }>) {
  const {
    isLoading: isHomeWorldLoading,
    isError: isHomeWorldError,
    data: homeWorldData,
    isSuccess,
  } = useQuery({
    queryKey: ["homeWorld", homeWorldUrl],
    queryFn: () => fetchUrl(homeWorldUrl),
    retry: 4,
    refetchInterval: 1000 * 2,
  });

  if (isHomeWorldLoading) {
    return <p>Loading...</p>;
  }

  if (isHomeWorldError || !isSuccess || !homeWorldData) {
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
