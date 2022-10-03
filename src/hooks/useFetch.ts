import { useQuery } from "react-query";
import todosService from "services/todos";
import userService from "services/user";

const useFetchTodos = () => {
  return useQuery(["listTodos"], () => todosService.getTodosData(1));
};

const useFetchUsers = () => {
  return useQuery(["listUsers"], () => userService.getUsersData(1));
};

export { useFetchTodos, useFetchUsers };
