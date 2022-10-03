import { useFetchActivities } from "hooks/useFetch";

export const List = () => {
  const { data, isLoading } = useFetchActivities();

  console.log(isLoading, data);

  return <div>Query Data</div>;
};
