import { Todos } from "types/data";
import { CoreService } from "./core";

class Todo extends CoreService {
  deleteTodos = async (id: number) => {
    return await this.fetch(`/todo-items/${id}`, "DELETE");
  };

  getAllTodos = async (id: number) => {
    return await this.fetch<{ data: Todos[] }>(
      `/todo-items${id ? `?activity_group_id=${id}` : ""}`,
      "GET",
    );
  };

  createTodos = async (props: Todos) => {
    return await this.fetch("/todo-items", "POST", {
      json: {
        ...props,
      },
    });
  };

  updateTodos = async (id: number, props: Todos) => {
    return await this.fetch(`/todo-items/${id}`, "PATCH", {
      json: {
        ...props,
      },
    });
  };
}

const todo = new Todo();

export default todo;
