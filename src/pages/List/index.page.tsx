import { useFetchTodos } from "hooks/useFetch";

export const List = () => {
  const { data, isLoading } = useFetchTodos();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      Query Data,
      {data?.data.map((item) => (
        <p key={item.id}>{item.isActive}</p>
      ))}
    </div>
  );
};
