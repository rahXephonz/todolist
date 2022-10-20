import { Todos } from "types/data";
import { CoreAPI } from "./core";

class Todo extends CoreAPI {
  deleteTodos = async (id: number) => {
    return await this.fetchjson(`/todo-items/${id}`, "DELETE");
  };

  getAllTodos = async (id: number) => {
    return await this.fetchjson<{ data: Todos[] }>(
      `/todo-items${id ? `?activity_group_id=${id}` : ""}`,
      "GET",
    );
  };

  createTodos = async (props: Todos) => {
    return await this.fetchjson("/todo-items", "POST", {
      json: {
        ...props,
      },
    });
  };

  updateTodos = async (id: number, props: Todos) => {
    return await this.fetchjson(`/todo-items/${id}`, "PATCH", {
      json: {
        ...props,
      },
    });
  };
}

const todo = new Todo();

export default todo;
